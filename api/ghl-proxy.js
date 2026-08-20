/**
 * Vercel Serverless Function — GHL Lead Capture Proxy
 * -----------------------------------------------------
 * Deployed automatically with the website on Vercel.
 * Receives quiz answers and creates a GHL contact via
 * the Private Integration API.
 *
 * Environment Variable (set in Vercel Dashboard):
 *   GHL_API_KEY  →  Your GHL Private Integration API key
 */

export default async function handler(req, res) {
  // ── CORS Headers ────────────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  // ── Build GHL v2 contact payload ─────────────────────────────────────────
  // Private Integration tokens require the v2 API (services.leadconnectorhq.com)
  const contact = {
    locationId: "AQHKrhSpoL5YDmV16KUQ",   // your GHL location ID
    email:      data.email,
    firstName:  data.name_professional_role,
    source:     "Audit Quiz — Website",
    tags:       ["Audit Quiz Lead"],
    customFields: [
      { key: "contact.name_professional_role", fieldValue: data.name_professional_role ?? "" },
      { key: "contact.company_name",           fieldValue: data.company_name           ?? "" },
      { key: "contact.company_do",             fieldValue: data.company_do             ?? "" },
      { key: "contact.areas_To_Automate",      fieldValue: data.areas_To_Automate      ?? "" },
      { key: "contact.repetitive_task_query",  fieldValue: data.repetitive_task_query  ?? "" },
      { key: "contact.operational_bottleneck", fieldValue: data.operational_bottleneck ?? "" },
      { key: "contact.operational_hours",      fieldValue: data.operational_hours      ?? "" },
    ],
  };

  // ── Call GHL Contacts API v2 Upsert ─────────────────────────────────────────
  try {
    const ghlResponse = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GHL_API_KEY}`,
        "Content-Type":  "application/json",
        "Version":       "2021-07-28",     // required header for GHL v2 API
      },
      body: JSON.stringify(contact),
    });

    const result = await ghlResponse.json();

    if (!ghlResponse.ok) {
      console.error("GHL API error:", ghlResponse.status, result);
      return res.status(502).json({ success: false, error: result });
    }

    return res.status(200).json({ success: true, contactId: result?.contact?.id });

  } catch (err) {
    console.error("Function error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
