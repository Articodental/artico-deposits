export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  try {
    const { pdfBase64 } = req.body;
    if (!pdfBase64) return res.status(400).json({ error: "No PDF data" });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "API key not configured" });

    console.log("Sending PDF to Claude API, base64 length:", pdfBase64.length);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2000,
        messages: [{
          role: "user",
          content: [
            {
              type: "document",
              source: { type: "base64", media_type: "application/pdf", data: pdfBase64 }
            },
            {
              type: "text",
              text: 'Look at this Daily Payments report from a dental office. Extract the section totals and individual check details. You must respond with ONLY a JSON object. No markdown, no backticks, no explanation. Just the raw JSON. The JSON format must be exactly: {"insuranceChecks":"0.00","mediEftInsurance":"0.00","cash":"0.00","debitCreditCards":"0.00","careCredit":"0.00","sunbit":"0.00","checks":[]} Rules: insuranceChecks = subtotal of Insurance Checks section only. mediEftInsurance = Total Insurance Payments amount (includes EFTs and insurance credit cards). cash = subtotal of Cash section under Patient Payments. debitCreditCards = subtotal of Credit Card section under Patient Payments. careCredit = subtotal of CareCredit section. sunbit = subtotal of SunBit section. checks = array of objects from Insurance Checks section with format {"checkNum":"12345","amount":"100.00","patient":"Name"}. If a section does not exist use "0.00". Use the bold subtotals not individual line items. ONLY output the JSON object nothing else.'
            }
          ]
        }]
      })
    });

    const data = await response.json();
    
    console.log("Claude API status:", response.status);
    
    if (!response.ok) {
      console.error("Claude API error:", JSON.stringify(data));
      return res.status(500).json({ error: "Claude API error: " + (data.error?.message || response.status) });
    }

    const text = data.content?.map(c => c.text || "").join("") || "";
    console.log("Claude response text:", text.substring(0, 500));

    let jsonStr = text.trim();
    jsonStr = jsonStr.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    const parsed = JSON.parse(jsonStr);
    return res.status(200).json(parsed);
  } catch (e) {
    console.error("Parse error:", e.message);
    return res.status(500).json({ error: "Failed to parse PDF: " + e.message });
  }
}
