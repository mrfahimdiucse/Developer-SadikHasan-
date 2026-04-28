import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPass = process.env.GMAIL_APP_PASS?.replace(/\s+/g, "");

  app.use(express.json());

  // Email API Route
  app.post("/api/send-email", async (req, res) => {
    const { name, email, subject, message, phone, service } = req.body;

    if (!gmailUser || !gmailAppPass) {
      res.status(500).json({
        success: false,
        message: "Email service is not configured. Add GMAIL_USER and GMAIL_APP_PASS to your .env file.",
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPass,
      },
    });

    const mailOptions = {
      from: gmailUser,
      to: gmailUser,
      subject: `New Form Submission: ${subject || "Contact Form"}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Service: ${service || "N/A"}
        Subject: ${subject || "N/A"}
        
        Message:
        ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
