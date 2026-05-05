export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  try {
    const { pdfBase64 } = req.body;
    if (!pdfBase64) return res.status(400).json({ error: "No PDF data" });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
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
              text: `Look at this Daily Payments report from a dental office. Extract the section totals and individual check details. Return ONLY a JSON object with no other text, in this exact format:
{
  "insuranceChecks": "0.00",
  "mediEftInsurance": "0.00",
  "cash": "0.00",
  "debitCreditCards": "0.00",
  "careCredit": "0.00",
  "sunbit": "0.00",
  "checks": [
    {"checkNum": "12345", "amount": "100.00", "patient": "Patient Name"}
  ]
}

Rules:
- "insuranceChecks" = the subtotal of the Insurance Checks section (NOT insurance EFTs)
- "mediEftInsurance" = the "Total Insurance Payments" amount which includes Insurance EFTs and insurance credit cards
- "cash" = the subtotal of the Cash section under Patient Payments
- "debitCreditCards" = the subtotal of the Credit Card section under Patient Payments
- "careCredit" = the subtotal of the CareCredit section
- "sunbit" = the subtotal of the SunBit section
- "checks" = individual line items from the Insurance Checks section with check numbers and amounts
- If a section doesn't exist in the document, use "0.00"
- Use the section subtotals (bold totals), not individual line items
- Return ONLY the JSON, no markdown, no backticks, no explanation`
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.map(c => c.text || "").join("") || "";
    
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);
  } catch (e) {
    console.error("Parse error:", e);
    return res.status(500).json({ error: "Failed to parse PDF" });
  }
}
