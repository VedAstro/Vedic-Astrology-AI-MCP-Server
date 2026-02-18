import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const VEDASTRO_API = "https://api.vedastro.org/api";

/**
 * Create and configure a new MCP server instance with tools.
 * @param apiKey - Optional VedAstro API key for unlimited requests (bypasses free tier throttling)
 */
export function createServer(apiKey?: string): McpServer {
  const server = new McpServer(
    { name: "VedAstro", version: "1.0.0" },
    {
      instructions:
        "Vedic Astrology MCP Server powered by VedAstro.org. " +
        "Provides horoscope predictions, compatibility/match reports, " +
        "numerology predictions, raw planet/house data, general astro data, " +
        "and ashtakvarga charts. " +
        "All calculations use the Raman Ayanamsa system. " +
        "Birth parameters: DD/MM/YYYY for dates, HH:MM for time, +HH:MM for timezone.",
    },
  );

  // ── Tool 1: get_horoscope_predictions ──
  server.tool(
    "get_horoscope_predictions",
    "Get Vedic astrology horoscope predictions for a person based on their " +
      "birth time and location. Returns life predictions about personality, " +
      "career, relationships, health, wealth, marriage, children, longevity, " +
      "and more based on planetary positions, yogas, and house placements. " +
      "Uses the Raman Ayanamsa system.",
    {
      latitude: z.string().describe("Birth location latitude (e.g., '19.0760' for Mumbai)"),
      longitude: z.string().describe("Birth location longitude (e.g., '72.8777' for Mumbai)"),
      birth_time: z.string().describe("Birth time in HH:MM 24-hour format (e.g., '14:30')"),
      birth_date: z.string().describe("Birth date in DD/MM/YYYY format (e.g., '25/10/1992')"),
      timezone: z.string().describe("Timezone offset in +HH:MM or -HH:MM format (e.g., '+05:30' for India)"),
    },
    async ({ latitude, longitude, birth_time, birth_date, timezone }) => {
      const url =
        `${VEDASTRO_API}/Calculate/HoroscopePredictions` +
        `/Location/${latitude},${longitude}` +
        `/Time/${birth_time}/${birth_date}/${timezone}` +
        `/Ayanamsa/RAMAN`;

      const headers: Record<string, string> = {};
      if (apiKey) {
        headers["x-api-key"] = apiKey;
      }

      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`VedAstro API error: ${res.status}`);

      const json = (await res.json()) as { Status: string; Payload: unknown };
      if (json.Status !== "Pass")
        throw new Error(`VedAstro API error: ${json.Payload}`);

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(json.Payload) },
        ],
      };
    },
  );

  // ── Tool 2: get_match_report ──
  server.tool(
    "get_match_report",
    "Get a Vedic astrology compatibility/match report between two people. " +
      "Returns Kuta score percentage and detailed predictions for " +
      "all 16 Kuta factors (Dina, Gana, Mahendra, Stree Deergha, etc.). " +
      "Each factor is rated as Good or Bad with detailed explanation. " +
      "Uses the Raman Ayanamsa system.",
    {
      male_latitude: z.string().describe("Male birth location latitude (e.g., '28.61')"),
      male_longitude: z.string().describe("Male birth location longitude (e.g., '77.21')"),
      male_birth_time: z.string().describe("Male birth time in HH:MM 24-hour format (e.g., '08:30')"),
      male_birth_date: z.string().describe("Male birth date in DD/MM/YYYY format (e.g., '15/06/1990')"),
      male_timezone: z.string().describe("Male timezone offset in +HH:MM or -HH:MM format (e.g., '+05:30')"),
      female_latitude: z.string().describe("Female birth location latitude (e.g., '34.05')"),
      female_longitude: z.string().describe("Female birth location longitude (e.g., '-118.24')"),
      female_birth_time: z.string().describe("Female birth time in HH:MM 24-hour format (e.g., '14:20')"),
      female_birth_date: z.string().describe("Female birth date in DD/MM/YYYY format (e.g., '22/09/1992')"),
      female_timezone: z.string().describe("Female timezone offset in +HH:MM or -HH:MM format (e.g., '-07:00')"),
    },
    async ({
      male_latitude,
      male_longitude,
      male_birth_time,
      male_birth_date,
      male_timezone,
      female_latitude,
      female_longitude,
      female_birth_time,
      female_birth_date,
      female_timezone,
    }) => {
      const url =
        `${VEDASTRO_API}/Calculate/MatchReport` +
        `/Location/${male_latitude},${male_longitude}` +
        `/Time/${male_birth_time}/${male_birth_date}/${male_timezone}` +
        `/Location/${female_latitude},${female_longitude}` +
        `/Time/${female_birth_time}/${female_birth_date}/${female_timezone}` +
        `/Ayanamsa/RAMAN`;

      const headers: Record<string, string> = {};
      if (apiKey) {
        headers["x-api-key"] = apiKey;
      }

      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`VedAstro API error: ${res.status}`);

      const json = (await res.json()) as { Status: string; Payload: unknown };
      if (json.Status !== "Pass")
        throw new Error(`VedAstro API error: ${json.Payload}`);

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(json.Payload) },
        ],
      };
    },
  );

  // ── Tool 3: get_numerology_prediction ──
  server.tool(
    "get_numerology_prediction",
    "Get a numerology prediction based on a name using the Chaldean system. " +
      "Returns the name number, ruling planet, detailed prediction, and life aspect " +
      "scores (Finance, Romance, Education, Health, Family, Growth, Career, " +
      "Reputation, Spirituality, Luck). Works for person names, business names, " +
      "project names, house numbers, or car numbers.",
    {
      name: z.string().describe("Name to analyze (person, business, project, house number, etc.)"),
    },
    async ({ name }) => {
      const url = `${VEDASTRO_API}/Calculate/NameNumberPrediction/FullName/${encodeURIComponent(name)}`;

      const headers: Record<string, string> = {};
      if (apiKey) {
        headers["x-api-key"] = apiKey;
      }

      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`VedAstro API error: ${res.status}`);

      const json = (await res.json()) as { Status: string; Payload: unknown };
      if (json.Status !== "Pass")
        throw new Error(`VedAstro API error: ${json.Payload}`);

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(json.Payload) },
        ],
      };
    },
  );

  // ── Tool 4: get_astrology_raw_data ──
  server.tool(
    "get_astrology_raw_data",
    "Get raw Vedic astrology data for all 9 planets and 12 houses. " +
      "Returns detailed planet data (sign placement, constellation, house occupied, " +
      "houses owned, lord of sign/constellation, degrees, retrograde status, etc.) " +
      "and house data (sign, constellation, planets in house, lord, aspecting planets, etc.). " +
      "Use this for detailed chart analysis when you need the underlying astronomical data. " +
      "Uses the Raman Ayanamsa system.",
    {
      latitude: z.string().describe("Birth location latitude (e.g., '19.0760' for Mumbai)"),
      longitude: z.string().describe("Birth location longitude (e.g., '72.8777' for Mumbai)"),
      birth_time: z.string().describe("Birth time in HH:MM 24-hour format (e.g., '14:30')"),
      birth_date: z.string().describe("Birth date in DD/MM/YYYY format (e.g., '25/10/1992')"),
      timezone: z.string().describe("Timezone offset in +HH:MM or -HH:MM format (e.g., '+05:30' for India)"),
    },
    async ({ latitude, longitude, birth_time, birth_date, timezone }) => {
      const timeLocation =
        `/Location/${latitude},${longitude}` +
        `/Time/${birth_time}/${birth_date}/${timezone}` +
        `/Ayanamsa/RAMAN`;

      const headers: Record<string, string> = apiKey ? { "x-api-key": apiKey } : {};

      const [planetRes, houseRes] = await Promise.all([
        fetch(`${VEDASTRO_API}/Calculate/AllPlanetData/PlanetName/All${timeLocation}`, { headers }),
        fetch(`${VEDASTRO_API}/Calculate/AllHouseData/HouseName/All${timeLocation}`, { headers }),
      ]);

      if (!planetRes.ok) throw new Error(`VedAstro API error (planet): ${planetRes.status}`);
      if (!houseRes.ok) throw new Error(`VedAstro API error (house): ${houseRes.status}`);

      const planetJson = (await planetRes.json()) as { Status: string; Payload: unknown };
      const houseJson = (await houseRes.json()) as { Status: string; Payload: unknown };

      if (planetJson.Status !== "Pass")
        throw new Error(`VedAstro API error (planet): ${planetJson.Payload}`);
      if (houseJson.Status !== "Pass")
        throw new Error(`VedAstro API error (house): ${houseJson.Payload}`);

      const combined = {
        PlanetData: planetJson.Payload,
        HouseData: houseJson.Payload,
      };

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(combined) },
        ],
      };
    },
  );

  // ── Tool 5: get_general_astro_data ──
  server.tool(
    "get_general_astro_data",
    "Get general Vedic astrology data for a birth chart including: " +
      "Ascendant/Lagna, Moon Sign, Moon Constellation/Nakshatra, " +
      "Sunrise/Sunset times, Nithya Yoga, Karana, Tithi (Lunar Day), " +
      "Day/Night birth, Varna, Hora, Weekday & Lord, Ayanamsa degree, " +
      "Kuja Dosa Score, Maraka Planets, Kartari Yoga planets/houses, " +
      "Pancha Pakshi Birth Bird, and more. " +
      "Returns raw values for 24 astrological properties. " +
      "Uses the Raman Ayanamsa system.",
    {
      latitude: z.string().describe("Birth location latitude (e.g., '19.0760' for Mumbai)"),
      longitude: z.string().describe("Birth location longitude (e.g., '72.8777' for Mumbai)"),
      birth_time: z.string().describe("Birth time in HH:MM 24-hour format (e.g., '14:30')"),
      birth_date: z.string().describe("Birth date in DD/MM/YYYY format (e.g., '25/10/1992')"),
      timezone: z.string().describe("Timezone offset in +HH:MM or -HH:MM format (e.g., '+05:30' for India)"),
    },
    async ({ latitude, longitude, birth_time, birth_date, timezone }) => {
      const timeLocation =
        `/Location/${latitude},${longitude}` +
        `/Time/${birth_time}/${birth_date}/${timezone}` +
        `/Ayanamsa/RAMAN`;

      // 24 endpoints matching GeneralAstroData class from website
      const endpoints = [
        { endpoint: "LocalMeanTime", payloadKey: "LocalMeanTime" },
        { endpoint: "AyanamsaDegree", payloadKey: "AyanamsaDegree" },
        { endpoint: "YoniKutaAnimal", payloadKey: "YoniKutaAnimal" },
        { endpoint: "MarakaPlanetList", payloadKey: "MarakaPlanetList" },
        { endpoint: "LagnaSignName", payloadKey: "LagnaSignName" },
        { endpoint: "MoonSignName", payloadKey: "MoonSignName" },
        { endpoint: "MoonConstellation", payloadKey: "MoonConstellation" },
        { endpoint: "SunriseTime", payloadKey: "SunriseTime" },
        { endpoint: "SunsetTime", payloadKey: "SunsetTime" },
        { endpoint: "NithyaYoga", payloadKey: "NithyaYoga" },
        { endpoint: "Karana", payloadKey: "Karana" },
        { endpoint: "DayDurationHours", payloadKey: "DayDurationHours" },
        { endpoint: "IsDayBirth", payloadKey: "IsDayBirth" },
        { endpoint: "LunarDay", payloadKey: "LunarDay" },
        { endpoint: "BirthVarna", payloadKey: "BirthVarna" },
        { endpoint: "HoraAtBirth", payloadKey: "HoraAtBirth" },
        { endpoint: "DayOfWeek", payloadKey: "DayOfWeek" },
        { endpoint: "LordOfWeekday", payloadKey: "LordOfWeekday" },
        { endpoint: "ShubKartariPlanets", payloadKey: "ShubKartariPlanets" },
        { endpoint: "PaapaKartariPlanets", payloadKey: "PaapaKartariPlanets" },
        { endpoint: "ShubKartariHouses", payloadKey: "ShubKartariHouses" },
        { endpoint: "PaapaKartariHouses", payloadKey: "PaapaKartariHouses" },
        { endpoint: "KujaDosaScore", payloadKey: "KujaDosaScore" },
        { endpoint: "PanchaPakshiBirthBird", payloadKey: "PanchaPakshiBirthBird" },
      ];

      const headers: Record<string, string> = apiKey ? { "x-api-key": apiKey } : {};

      // Fire all 24 fetches in parallel
      const results = await Promise.allSettled(
        endpoints.map(async ({ endpoint, payloadKey }) => {
          const url = `${VEDASTRO_API}/Calculate/${endpoint}${timeLocation}`;
          const res = await fetch(url, { headers });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = (await res.json()) as { Status: string; Payload: Record<string, unknown> };
          if (json.Status !== "Pass") throw new Error(`API error`);
          return { key: payloadKey, value: json.Payload[payloadKey] };
        }),
      );

      // Combine results, skipping failed endpoints
      const combined: Record<string, unknown> = {};
      for (const result of results) {
        if (result.status === "fulfilled") {
          combined[result.value.key] = result.value.value;
        }
      }

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(combined) },
        ],
      };
    },
  );

  // ── Tool 6: get_ashtakvarga_data ──
  server.tool(
    "get_ashtakvarga_data",
    "Get Ashtakvarga charts for a birth chart. Returns both " +
      "Sarvashtakavarga (combined strength of all planets across 12 signs) " +
      "and Bhinnashtakavarga (individual planet contributions). " +
      "Each chart contains rows per planet with 12 sign values and totals. " +
      "Used for assessing planetary strength in transit analysis. " +
      "Uses the Raman Ayanamsa system.",
    {
      latitude: z.string().describe("Birth location latitude (e.g., '19.0760' for Mumbai)"),
      longitude: z.string().describe("Birth location longitude (e.g., '72.8777' for Mumbai)"),
      birth_time: z.string().describe("Birth time in HH:MM 24-hour format (e.g., '14:30')"),
      birth_date: z.string().describe("Birth date in DD/MM/YYYY format (e.g., '25/10/1992')"),
      timezone: z.string().describe("Timezone offset in +HH:MM or -HH:MM format (e.g., '+05:30' for India)"),
    },
    async ({ latitude, longitude, birth_time, birth_date, timezone }) => {
      const timeLocation =
        `/Location/${latitude},${longitude}` +
        `/Time/${birth_time}/${birth_date}/${timezone}` +
        `/Ayanamsa/RAMAN`;

      const headers: Record<string, string> = apiKey ? { "x-api-key": apiKey } : {};

      const [sarvaRes, bhinnaRes] = await Promise.all([
        fetch(`${VEDASTRO_API}/Calculate/SarvashtakavargaChart${timeLocation}`, { headers }),
        fetch(`${VEDASTRO_API}/Calculate/BhinnashtakavargaChart${timeLocation}`, { headers }),
      ]);

      if (!sarvaRes.ok) throw new Error(`VedAstro API error (sarva): ${sarvaRes.status}`);
      if (!bhinnaRes.ok) throw new Error(`VedAstro API error (bhinna): ${bhinnaRes.status}`);

      const sarvaJson = (await sarvaRes.json()) as { Status: string; Payload: unknown };
      const bhinnaJson = (await bhinnaRes.json()) as { Status: string; Payload: unknown };

      if (sarvaJson.Status !== "Pass")
        throw new Error(`VedAstro API error (sarva): ${sarvaJson.Payload}`);
      if (bhinnaJson.Status !== "Pass")
        throw new Error(`VedAstro API error (bhinna): ${bhinnaJson.Payload}`);

      const combined = {
        SarvashtakavargaChart: sarvaJson.Payload,
        BhinnashtakavargaChart: bhinnaJson.Payload,
      };

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(combined) },
        ],
      };
    },
  );

  return server;
}
