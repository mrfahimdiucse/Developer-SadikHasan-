<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b2b53545-d0dc-44b7-bdf2-c046be1d5722

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env` file for email delivery:
   `GMAIL_USER=your-gmail@gmail.com`
   `GMAIL_APP_PASS=your-16-character-app-password`
3. If you use Gemini features, set the `GEMINI_API_KEY` in `.env.local`
4. Run the app:
   `npm run dev`
