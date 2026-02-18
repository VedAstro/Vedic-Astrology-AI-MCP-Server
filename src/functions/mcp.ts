import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createServer } from "../server.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";

/**
 * Extract API key from request headers.
 * Supports x-api-key, APIKey, and Authorization: Bearer formats.
 */
function extractApiKey(headers: Headers): string | undefined {
  // Try x-api-key header (most common for API keys)
  const xApiKey = headers.get("x-api-key");
  if (xApiKey?.trim()) return xApiKey.trim();

  // Try APIKey header (alternative format)
  const apiKeyHeader = headers.get("APIKey");
  if (apiKeyHeader?.trim()) return apiKeyHeader.trim();

  // Try Authorization: Bearer token
  const authHeader = headers.get("Authorization");
  if (authHeader?.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token) return token;
  }

  return undefined;
}

/**
 * Custom SSE Transport implementation for Azure Functions.
 * Implements the Transport interface to properly connect with MCP server.
 */
class AzureFunctionsSSETransport implements Transport {
  private controller: ReadableStreamDefaultController | null = null;
  public onclose?: () => void;
  public onerror?: (error: Error) => void;
  public onmessage?: (message: JSONRPCMessage) => void;

  constructor(controller: ReadableStreamDefaultController) {
    this.controller = controller;
  }

  async start(): Promise<void> {
    // Send initial endpoint event telling client where to POST messages
    const endpointEvent = `event: endpoint\ndata: /api/messages\n\n`;
    this.controller?.enqueue(new TextEncoder().encode(endpointEvent));
  }

  async send(message: JSONRPCMessage): Promise<void> {
    if (!this.controller) {
      throw new Error("Transport not connected");
    }
    const data = JSON.stringify(message);
    const sseMessage = `event: message\ndata: ${data}\n\n`;
    this.controller.enqueue(new TextEncoder().encode(sseMessage));
  }

  async close(): Promise<void> {
    this.controller = null;
    this.onclose?.();
  }
}

// Store active SSE sessions (session ID -> transport)
const sseSessions = new Map<
  string,
  {
    transport: AzureFunctionsSSETransport;
    server: ReturnType<typeof createServer>;
  }
>();

/**
 * Azure Function HTTP trigger for Streamable HTTP endpoint (/mcp).
 * This is the modern, recommended transport that works with Claude Desktop,
 * VS Code, Windsurf, and other Streamable HTTP-compatible clients.
 */
async function mcpHandler(
  request: HttpRequest,
  _context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    // Extract API key from request headers
    const apiKey = extractApiKey(request.headers);

    // Create server with API key
    const server = createServer(apiKey);
    const t = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    await server.connect(t);

    const body = request.method === "POST" ? await request.text() : undefined;
    const webRequest = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body,
    });

    const webResponse = await t.handleRequest(webRequest);

    const responseBody = await webResponse.text();
    const headers: Record<string, string> = {};
    webResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-length") {
        headers[key] = value;
      }
    });

    return {
      status: webResponse.status,
      headers,
      body: responseBody,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return {
      status: 500,
      jsonBody: {
        jsonrpc: "2.0",
        error: { code: -32603, message },
        id: null,
      },
    };
  }
}

/**
 * Azure Function HTTP trigger for legacy SSE endpoint (/sse).
 * This endpoint establishes a long-lived SSE connection for ChatGPT compatibility.
 * Clients connect via GET and receive server messages as SSE events.
 */
async function sseHandler(
  request: HttpRequest,
  _context: InvocationContext,
): Promise<HttpResponseInit> {
  if (request.method !== "GET") {
    return {
      status: 405,
      body: "Method not allowed. Use GET to establish SSE connection.",
    };
  }

  try {
    // Extract API key from request headers
    const apiKey = extractApiKey(request.headers);

    // Generate session ID
    const sessionId = crypto.randomUUID();

    // Create SSE stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Create transport
          const transport = new AzureFunctionsSSETransport(controller);

          // Create and connect MCP server with API key
          const server = createServer(apiKey);
          await server.connect(transport);

          // Start transport (sends endpoint event)
          await transport.start();

          // Store session
          sseSessions.set(sessionId, { transport, server });

          console.log(`SSE session ${sessionId} established`);
        } catch (err) {
          console.error("Error starting SSE session:", err);
          controller.error(err);
        }
      },
      cancel() {
        // Cleanup session when client disconnects
        const session = sseSessions.get(sessionId);
        if (session) {
          session.transport.close().catch(console.error);
          sseSessions.delete(sessionId);
        }
        console.log(`SSE session ${sessionId} closed`);
      },
    });

    return {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Session-Id": sessionId,
      },
      body: stream,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return {
      status: 500,
      jsonBody: {
        error: message,
      },
    };
  }
}

/**
 * Azure Function HTTP trigger for legacy SSE message endpoint (/messages).
 * Clients POST JSON-RPC messages to this endpoint.
 * Messages are routed to the appropriate SSE session and processed by the MCP server.
 */
async function messagesHandler(
  request: HttpRequest,
  _context: InvocationContext,
): Promise<HttpResponseInit> {
  if (request.method !== "POST") {
    return {
      status: 405,
      body: "Method not allowed. Use POST to send messages.",
    };
  }

  try {
    // Get session ID from header or query param
    const sessionId =
      request.headers.get("X-Session-Id") || request.query.get("sessionId");
    if (!sessionId) {
      return {
        status: 400,
        body: "Missing X-Session-Id header or sessionId query parameter",
      };
    }

    // Find session
    const session = sseSessions.get(sessionId);
    if (!session) {
      return {
        status: 404,
        body: "Session not found. Please reconnect to /api/sse",
      };
    }

    // Parse message
    const bodyText = await request.text();
    const message = JSON.parse(bodyText) as JSONRPCMessage;

    // Forward message to transport's onmessage handler
    if (session.transport.onmessage) {
      session.transport.onmessage(message);
    }

    return {
      status: 202,
      body: "Accepted",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return {
      status: 500,
      jsonBody: {
        error: message,
      },
    };
  }
}

// Register Azure Functions
app.http("mcp", {
  methods: ["GET", "POST", "DELETE"],
  authLevel: "anonymous",
  route: "mcp",
  handler: mcpHandler,
});

app.http("sse", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "sse",
  handler: sseHandler,
});

app.http("messages", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "messages",
  handler: messagesHandler,
});
