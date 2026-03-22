<div align="center">

# ✨ Vedic Astrology MCP Server

### Astrology Tools for Your AI

[![World's First](https://img.shields.io/badge/World's_First-Astrology_MCP_Server-blueviolet?style=for-the-badge)]()
[![Free Tier](https://img.shields.io/badge/Free_Tier-5_req%2Fmin-green?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-Open_Source-blue?style=for-the-badge)](https://github.com/VedAstro/VedAstro)

Connect **Claude, ChatGPT, Cursor, or any AI assistant** to Vedic astrology. Get horoscope predictions, compatibility match reports, numerology analysis, and decode planetary influences — all through one simple MCP connection.

**🔗 MCP Server Endpoint**

```
https://mcp.vedastro.org/api/mcp
```

[🔌 Connect Now](#-quick-connect-guide) · [🌐 Live Page](https://vedastro.org/MCPServerApp.html) · [📦 Main Repo](https://github.com/VedAstro/VedAstro) · [🏠 VedAstro.org](https://vedastro.org)

</div>

---

## 📊 Key Stats

| 🏆 1st | 🌍 200+ | ⚡ Free | 💲 $1/mo |
|:---:|:---:|:---:|:---:|
| **Astrology MCP Server<br/>in the World** | **Horoscope Predictions<br/>Analyzed** | **5 Requests/Minute<br/>Free Tier** | **Unlimited Use<br/>with API Key** |

---

## 🔌 What is MCP?

**MCP (Model Context Protocol)** is the open standard created by Anthropic that lets AI assistants connect to external tools and data sources. Think of it as a **universal plug** that gives any AI the ability to access real-world capabilities.

VedAstro's MCP Server brings the full power of Vedic astrology — horoscope predictions, compatibility matching, numerology, planetary positions, yogas, and house analysis — directly into AI conversations.

### Why It Matters

- **💬 Natural Conversations** — Ask your AI "What does my birth chart say?" and get real Vedic astrology analysis, not generic horoscopes.
- **🤖 Works with Any AI** — Claude, ChatGPT, Gemini, Cursor — any MCP-compatible client works.
- **🛡️ Authentic Calculations** — Powered by VedAstro's Swiss Ephemeris engine with Raman Ayanamsa — the same precision astrologers trust.
- **💻 Zero Code Required** — Just paste one URL into your AI client's settings. No SDKs, no libraries, no API wrappers needed.

---

## 🚀 How It Works

```
Step 1: Copy the URL        Step 2: Paste in Your AI      Step 3: Ask Anything
┌─────────────┐         ┌──────────────────┐        ┌─────────────────┐
│  Copy the   │────────▶│  Paste in Your   │───────▶│  Ask Anything   │
│    URL      │         │     AI Client    │        │                 │
└─────────────┘         └──────────────────┘        └─────────────────┘
Copy the MCP            Add it to Claude,           "What are my horoscope
server endpoint         ChatGPT, Gemini,             predictions?" and your
URL from below          Cursor, or any               AI delivers Vedic
                        MCP client                   insights
```

---

## 🔗 MCP Server Endpoint

> **This is the only URL you need.** Copy it and paste into your AI client.
>
> ```
> https://mcp.vedastro.org/api/mcp
> ```

📖 **Full Interactive Guide:** [https://vedastro.org/MCPServerApp.html](https://vedastro.org/MCPServerApp.html)

---

## ⚡ Quick Connect Guide

### 🤖 Claude Desktop

**Option 1: Simple URL Paste (Recommended)**
1. Open Claude Desktop and go to **Settings** (gear icon)
2. Click **Connectors** tab and scroll to the bottom
3. Click **"Add custom connector"** and paste the URL below
4. Restart Claude Desktop
5. Ask Claude: *"Using my birth details (date, time, location), get my Vedic horoscope predictions"*

**Free Tier** (5 requests/minute):
```
https://mcp.vedastro.org/api/mcp
```

**Unlimited** ($1/month with [API Key](https://buy.stripe.com/5kA8y67nVchNdqw4gx)):
```
https://mcp.vedastro.org/api/mcp/key/your-api-key-here
```

**Option 2: Manual JSON Config (Advanced)**
1. Go to **Settings** > **Developer** > **Edit Config**
2. Add the configuration below to `claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vedastro": {
      "url": "https://mcp.vedastro.org/api/mcp/key/your-api-key-here"
    }
  }
}
```

### 📝 Cursor

1. Open Cursor and go to **Settings** > **MCP**
2. Click **"Add new MCP server"**
3. Set Type to **http**, Name to **vedastro**, and paste the appropriate URL below
4. Ask in chat: *"Get Vedic horoscope predictions for someone born on 25/10/1992 at 14:30 in Mumbai"*

**Free Tier** (5 requests/minute):
```json
// In .cursor/mcp.json at your project root:
{
  "mcpServers": {
    "vedastro": {
      "url": "https://mcp.vedastro.org/api/mcp"
    }
  }
}
```

**Unlimited** ($1/month with [API Key](https://buy.stripe.com/5kA8y67nVchNdqw4gx)):
```json
{
  "mcpServers": {
    "vedastro": {
      "url": "https://mcp.vedastro.org/api/mcp/key/your-api-key-here"
    }
  }
}
```

### 💬 ChatGPT

1. Open ChatGPT and go to **Settings** > **Apps & Connectors** > **Advanced**
2. Toggle **"Developer Mode"** on
3. Under Connectors, click **"Create"**
4. Set Name to **VedAstro** and paste the appropriate URL below
5. Set Authentication to **None**
6. Check **"I trust this application"** and click **Create**
7. In a new chat, click **"+"** and select your VedAstro connector

**Free Tier** (5 requests/minute):
```
URL: https://mcp.vedastro.org/api/mcp
Authentication: None
```

**Unlimited** ($1/month with [API Key](https://buy.stripe.com/5kA8y67nVchNdqw4gx)):
```
URL: https://mcp.vedastro.org/api/mcp/key/your-api-key-here
Authentication: None
```

> **Note:** If ChatGPT requires the legacy SSE endpoint, use `https://mcp.vedastro.org/api/sse/key/your-api-key-here` for premium or `https://mcp.vedastro.org/api/sse` for free tier.

### 🔮 Google Gemini

1. Install Gemini CLI: `npm install -g @google/generative-ai-cli`
2. Run `gemini mcp add` and provide server details
3. Verify connection: `gemini /mcp` to see available tools
4. Ask Gemini: *"Using the VedAstro MCP server, get my horoscope predictions"*

**Free Tier** (5 requests/minute):
```json
{
  "mcpServers": {
    "vedastro": {
      "httpUrl": "https://mcp.vedastro.org/api/mcp"
    }
  }
}
```

**Unlimited** ($1/month with [API Key](https://buy.stripe.com/5kA8y67nVchNdqw4gx)):
```json
{
  "mcpServers": {
    "vedastro": {
      "httpUrl": "https://mcp.vedastro.org/api/mcp/key/your-api-key-here"
    }
  }
}
```

### ⚙️ Other / Custom MCP Clients

For any MCP-compatible client, use these connection details:

| Property | Value |
|---|---|
| **Transport** | Streamable HTTP |
| **Free Tier URL** | `https://mcp.vedastro.org/api/mcp` |
| **Premium URL** | `https://mcp.vedastro.org/api/mcp/key/{your-api-key}` |
| **Server Name** | VedAstro |
| **Available Tools** | `get_horoscope_predictions`, `get_match_report`, `get_numerology_prediction`, `get_astrology_raw_data`, `get_general_astro_data`, `get_ashtakvarga_data` |

**Free Tier** (5 requests/minute):
```json
{
  "server_name": "vedastro",
  "transport": "streamable-http",
  "url": "https://mcp.vedastro.org/api/mcp"
}
```

**Unlimited** ($1/month with [API Key](https://buy.stripe.com/5kA8y67nVchNdqw4gx)):
```json
{
  "server_name": "vedastro",
  "transport": "streamable-http",
  "url": "https://mcp.vedastro.org/api/mcp/key/your-api-key-here"
}
```

> **Note:** Advanced users can also pass API keys via headers (`x-api-key`, `APIKey`, or `Authorization: Bearer`), but the URL-based approach is simpler and works with all clients.

---

## 🔑 API Key Authentication (Unlimited Access)

The MCP server supports **optional API key authentication** for unlimited requests. Without an API key, you get **5 requests/minute** (free tier). With an API key, you get **unlimited requests** for just **$1/month**.

### How to Add API Key

Simply embed your API key in the URL:

**Free Tier:**
```
https://mcp.vedastro.org/api/mcp
```

**Unlimited Tier:**
```
https://mcp.vedastro.org/api/mcp/key/your-api-key-here
```

**Example Configuration:**
```json
{
  "mcpServers": {
    "vedastro": {
      "url": "https://mcp.vedastro.org/api/mcp/key/your-api-key-here"
    }
  }
}
```

### Alternative: Header-Based Authentication (Advanced)

For advanced users, the server also accepts API keys via headers:
- ✅ `x-api-key: your-key-here`
- ✅ `APIKey: your-key-here`
- ✅ `Authorization: Bearer your-key-here`

```json
{
  "mcpServers": {
    "vedastro": {
      "url": "https://mcp.vedastro.org/api/mcp",
      "headers": {
        "x-api-key": "your-api-key-here"
      }
    }
  }
}
```

> **Note:** URL-based authentication is recommended for universal compatibility. Header-based auth requires manual JSON config editing on some clients (like Claude Desktop).

### Get Your API Key

👉 [**Purchase API Key — $1/month**](https://buy.stripe.com/5kA8y67nVchNdqw4gx)

After purchase, your API key will be visible on your [**Account Page**](https://vedastro.org/Account.html) or [**API Builder Page**](https://vedastro.org/APIBuilder.html). Copy it and add it to your MCP client URL as shown above.

---

## 🛠️ Available MCP Tools

### ⭐ `get_horoscope_predictions`

Get comprehensive Vedic astrology horoscope predictions for a person based on their birth time and location. Returns 200+ life predictions covering personality, career, relationships, health, wealth, marriage, children, longevity, and more based on planetary positions, yogas, and house placements.

**Parameters:**
- `latitude` — Birth location latitude
- `longitude` — Birth location longitude
- `birth_time` — HH:MM format
- `birth_date` — DD/MM/YYYY format
- `timezone` — +HH:MM format

### 💕 `get_match_report`

Get a Vedic astrology compatibility/match report between two people. Returns Kuta score percentage and detailed predictions for all 16 Kuta factors (Dina, Gana, Mahendra, Stree Deergha, etc.). Each factor is rated as Good or Bad with a detailed explanation.

**Parameters:**
- `male_*` — Male birth details (lat, lon, time, date, tz)
- `female_*` — Female birth details (lat, lon, time, date, tz)

### 🔢 `get_numerology_prediction`

Get a numerology prediction based on a name using the Chaldean system. Returns the name number, ruling planet, detailed prediction, and life aspect scores (Finance, Romance, Education, Health, Family, Growth, Career, Reputation, Spirituality, Luck). Works for person names, business names, project names, house numbers, or car numbers.

**Parameters:**
- `name` — Name to analyze

### 📊 `get_astrology_raw_data`

Get raw Vedic astrology data for all 9 planets and 12 houses. Returns detailed planet data (sign placement, constellation, house occupied, houses owned, lord of sign/constellation, degrees, retrograde status) and house data (sign, constellation, planets in house, lord, aspecting planets). Use this for detailed chart analysis.

**Parameters:**
- `latitude` — Birth location latitude
- `longitude` — Birth location longitude
- `birth_time` — HH:MM format
- `birth_date` — DD/MM/YYYY format
- `timezone` — +HH:MM format

### ☀️ `get_general_astro_data`

Get 24 general Vedic astrology properties for a birth chart including Ascendant/Lagna, Moon Sign, Moon Nakshatra, Sunrise/Sunset, Nithya Yoga, Karana, Tithi, Day/Night birth, Varna, Hora, Weekday & Lord, Kuja Dosa Score, Maraka Planets, Kartari Yoga data, Pancha Pakshi Birth Bird, and more.

**Parameters:**
- `latitude` — Birth location latitude
- `longitude` — Birth location longitude
- `birth_time` — HH:MM format
- `birth_date` — DD/MM/YYYY format
- `timezone` — +HH:MM format

### 📈 `get_ashtakvarga_data`

Get Ashtakvarga charts including Sarvashtakavarga (combined planetary strength across 12 signs) and Bhinnashtakavarga (individual planet contributions). Each chart has rows per planet with 12 sign values and totals. Essential for transit analysis and planetary strength assessment.

**Parameters:**
- `latitude` — Birth location latitude
- `longitude` — Birth location longitude
- `birth_time` — HH:MM format
- `birth_date` — DD/MM/YYYY format
- `timezone` — +HH:MM format

---

## 💬 See It in Action

> A real conversation with Claude using VedAstro MCP Server

**User:**
> I was born on October 25, 1992 at 2:30 PM in Mumbai, India. What are my Vedic horoscope predictions?

**Claude:**
> ⚙️ *Using **get_horoscope_predictions** with latitude: 19.0760, longitude: 72.8777...*
>
> Based on your Vedic birth chart analysis (Mumbai, 25/10/1992 at 14:30):
>
> **Career & Success:** You have strong Raja Yoga combinations suggesting leadership abilities and professional success. Jupiter's influence on the 10th house indicates wisdom-driven career growth.
>
> **Personality:** Moon in a benefic position gives you emotional intelligence and intuitive abilities.
>
> **Relationships:** Venus placement suggests harmonious partnerships with strong emotional bonds...
>
> *...and 200+ more detailed predictions covering all life areas*

---

## 💰 Simple Pricing

|  | 🎁 **Free** | ♾️ **Unlimited** |
|---|:---:|:---:|
| **Price** | $0 forever | **$1/month** |
| **Requests** | 5 per minute | Unlimited |
| **Sign-up** | Not required | API Key |
| **All MCP Tools** | ✅ | ✅ |
| **Full Prediction Data** | ✅ | ✅ |
| **Priority Response** | — | ✅ |

👉 [**Get Unlimited API Key — $1/month**](https://vedastro.org/MCPServerApp.html)

---

## ⚙️ Technical Specifications

| Spec | Details |
|---|---|
| **Protocol** | Model Context Protocol (MCP) via Streamable HTTP transport |
| **Infrastructure** | Azure Functions v4 (Node.js) with Streamable HTTP transport |
| **Ephemeris Engine** | Swiss Ephemeris with Raman Ayanamsa for precise planetary calculations |
| **Response Time** | Typically under 5 seconds for full horoscope prediction analysis |
| **Security** | HTTPS encrypted, no personal data stored, stateless calculations |
| **Open Source** | Full source code available on [GitHub](https://github.com/VedAstro/VedAstro) |

---

## ❓ FAQ

**What is MCP and why does it matter?**

MCP (Model Context Protocol) is an open standard developed by Anthropic that allows AI assistants to connect to external tools and data sources. It's like USB for AI — a universal connector that lets any compatible AI access VedAstro's Vedic astrology calculations without custom integration code. This means Claude, ChatGPT, Cursor, and other AI tools can all use VedAstro through the same simple connection.

**Which AI clients support MCP?**

Claude Desktop, Cursor, VS Code (GitHub Copilot), Windsurf, and many more AI coding assistants and chat applications. The list is growing rapidly. Any application that supports the MCP protocol can connect to VedAstro's astrology server.

**Is the free tier really free?**

Yes, completely free with no sign-up required. The free tier allows 5 requests per minute, which is plenty for personal use. For unlimited requests, get an API key for just $1/month.

**How accurate are the predictions?**

VedAstro uses the Swiss Ephemeris — the same precision astronomical engine used by professional astrologers worldwide. Calculations use the Raman Ayanamsa system and analyze all 9 Vedic planets across 12 houses with hundreds of yoga combinations based on classical Vedic astrology texts.

**Can I use this in my own application?**

Absolutely! The MCP server is designed to be used by any MCP-compatible client. For direct API access (without MCP), check out the [API Builder](https://vedastro.org/APIBuilder.html) page.

---

<div align="center">

## ✨ Bring Ancient Wisdom to the AI Age

VedAstro's MCP Server bridges 5,000 years of Vedic astrology with modern AI. Connect in 30 seconds and give your AI the power of horoscope predictions, compatibility matching, and numerology.

### 🔗 Links

[🔌 **Connect Now**](https://vedastro.org/MCPServerApp.html) · [🏠 **VedAstro.org**](https://vedastro.org) · [⭐ **Star on GitHub**](https://github.com/VedAstro/VedAstro) · [📖 **Documentation**](https://vedastro.org/docs)

---

Made with ❤️ by [**VedAstro**](https://vedastro.org) — A non-profit, open source project to make Vedic Astrology easily available to all.

</div>
