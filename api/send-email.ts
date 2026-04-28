export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPass = process.env.GMAIL_APP_PASS?.replace(/\s+/g, "");

  if (!gmailUser || !gmailAppPass) {
    return res.status(500).json({
      success: false,
      message: "Email service is not configured. Add GMAIL_USER and GMAIL_APP_PASS to your environment variables.",
    });
  }

  let body: Record<string, unknown> = {};
  if (typeof req.body === "string") {
    try {
      body = JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON body.",
      });
    }
  } else if (req.body && typeof req.body === "object") {
    body = req.body as Record<string, unknown>;
  }

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
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPass,
      },
    });

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      replyTo: email || gmailUser,
      subject: `New Form Submission: ${subject || "Contact Form"}`,
      text: `Name: ${name || "N/A"}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}
Service: ${service || "N/A"}
Subject: ${subject || "N/A"}

Message:
${message || "N/A"}`,
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Service:</strong> ${service || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${(message || "N/A").replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Vercel email API error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to send email",
    });
  }
}
