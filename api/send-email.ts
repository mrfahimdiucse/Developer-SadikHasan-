import { getEmailConfigErrorMessage, sendContactEmail } from "../lib/contact-email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid JSON body.",
      },
      { status: 400 },
    );
  }

  const configError = getEmailConfigErrorMessage();
  if (configError) {
    return Response.json(
      {
        success: false,
        message: configError,
      },
      { status: 500 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";

  if (!name || !email || !message) {
    return Response.json(
      {
        success: false,
        message: "Name, email, and message are required.",
      },
      { status: 400 },
    );
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

    return Response.json(
      {
        success: true,
        message: "Email sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Vercel email API error:", error);
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 },
    );
  }
}
