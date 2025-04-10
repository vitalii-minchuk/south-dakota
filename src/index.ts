import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(router);

const sendTelegramMessage = async (message: string) => {
  const botToken = "YOUR_BOT_TOKEN";
  const chatId = "YOUR_CHAT_ID";
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const body = {
    chat_id: chatId,
    text: "🌟 **Exciting Announcement** 🌟\n\n🚀 New features are coming soon! Stay tuned for updates! 🎉",
    parse_mode: "Markdown",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Message sent:", data);
    } else {
      console.error("Telegram error:", data);
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!");
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
