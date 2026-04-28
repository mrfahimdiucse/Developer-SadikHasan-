import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { getEmailConfigErrorMessage, sendContactEmail } from "./lib/contact-email";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(express.json());

  // Email API Route
  app.post("/api/send-email", async (req, res) => {
    const { name, email, subject, message, phone, service } = req.body;

    const configError = getEmailConfigErrorMessage();
    if (configError) {
      res.status(500).json({
        success: false,
        message: configError,
      });
      return;
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
