export type ContactEmailPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
  service?: string;
};

function getEmailCredentials() {
  return {
    gmailUser: process.env.GMAIL_USER?.trim(),
    gmailAppPass: process.env.GMAIL_APP_PASS?.replace(/\s+/g, ""),
  };
}

export function getEmailConfigErrorMessage() {
  const { gmailUser, gmailAppPass } = getEmailCredentials();

  if (!gmailUser || !gmailAppPass) {
    return "Email service is not configured. Add GMAIL_USER and GMAIL_APP_PASS to your environment variables.";
  }

  return null;
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
  phone,
  service,
}: ContactEmailPayload) {
  const { gmailUser, gmailAppPass } = getEmailCredentials();

  if (!gmailUser || !gmailAppPass) {
    throw new Error("Missing Gmail SMTP credentials.");
  }

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
}
