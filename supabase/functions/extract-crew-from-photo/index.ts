// Watch Schedule — extract-crew-from-photo Edge Function.
// Accepts a base64-encoded crew list image, sends it to the Claude API with
// vision, and returns structured crew member data for captain confirmation.
// verify_jwt = true (default): callers must supply a valid user JWT.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders, jsonResponse, errorResponse } from "../_shared/cors.ts";
import { getUserClient, requireUser, HttpError } from "../_shared/client.ts";

type Department = "command" | "deck" | "interior" | "engineering" | "unassigned";

interface ExtractedCrewMember {
  full_name: string;
  position: string | null;
  rank: string | null;
  department: Department;
}

const CREW_EXTRACTION_PROMPT = `Analyse this image of a superyacht crew list and extract every visible crew member.

For each crew member return:
- full_name: their full name as written
- position: their specific job title (e.g. "Chief Officer", "Bosun", "Chef de Cuisine", "Chief Stewardess")
- rank: their rank if different from position (e.g. "OOW", "AB", "STCW Officer") — null if same or absent
- department: exactly one of "command", "deck", "interior", "engineering", or "unassigned"

Department guide:
- command: Captain / Master only
- deck: Deck officers, Bosun, Deckhands, AB, OOW (Deck), Mate
- interior: Chief Stew, Stewardess, Chef, Cook, Interior, Purser, Guest Services
- engineering: Chief Engineer, 2nd Engineer, ETO, Electrician, Engineer
- unassigned: anything unclear

Return ONLY a valid JSON array — no markdown, no explanation, no extra text:
[{"full_name":"...","position":"...","rank":null,"department":"..."}]

If the image contains no crew list at all, return an empty array: []`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const client = getUserClient(req);
    await requireUser(client);

    const body = await req.json();
    const { image_base64, media_type = "image/jpeg" } = body ?? {};

    if (!image_base64 || typeof image_base64 !== "string") {
      throw new HttpError("image_base64 (string) is required.", 422);
    }

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) throw new HttpError("Claude API key not configured.", 503);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type, data: image_base64 },
              },
              { type: "text", text: CREW_EXTRACTION_PROMPT },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new HttpError(`Claude API error (${response.status}): ${errText}`, 502);
    }

    const result = await response.json();
    const raw = result.content?.[0]?.text ?? "[]";

    let crew: ExtractedCrewMember[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        crew = parsed.filter(
          (m) => m && typeof m.full_name === "string" && m.full_name.trim(),
        );
      }
    } catch {
      crew = [];
    }

    return jsonResponse({ crew });
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 500;
    return errorResponse(err instanceof Error ? err.message : "Unexpected error", status);
  }
});
