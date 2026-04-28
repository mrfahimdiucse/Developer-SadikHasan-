import { getEmailConfigErrorMessage, sendContactEmail } from "../lib/contact-email";

function parseRequestBody(body: unknown) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  if (typeof body === "object") {
    return body as Record<string, unknown>;
  }

  return {};
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const configError = getEmailConfigErrorMessage();
  if (configError) {
    return res.status(500).json({
      success: false,
      message: configError,
    });
  }

  const body = parseRequestBody(req.body);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  try {
    await sendContactEmail({
      name,
      email,
      subject,
      message,
      phone,
      service,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Vercel email API error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
}
