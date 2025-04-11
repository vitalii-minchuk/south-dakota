import express, { json } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import router from "./routes";
import axios from "axios";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(router);

const sendTelegramMessage = async (message: string) => {
  const botToken = "111111";
  const chatId = "111111";
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

const testFondy = async () => {
  const fondyPassword = "test";
  const params = {
    order_id: "12366",
    merchant_id: "1396424",
    amount: "5400",
    order_desc: "test description",
    currency: "UAH",
  };
  const sortedParams = Object.keys(params).sort((a, b) => a.localeCompare(b));
  const stringBody = (sortedParams as Array<keyof typeof params>)
    .map((el) => params[el])
    .join("|");

  function generateSignature(string: string) {
    const sha1 = crypto.createHash("sha1");
    sha1.update(`${fondyPassword}|${string}`);
    return sha1.digest("hex");
  }

  const { data } = await axios.post("https://pay.fondy.eu/api/checkout/url/", {
    request: {
      ...params,
      signature: generateSignature(stringBody),
    },
  });
  console.log(generateSignature(stringBody));
  console.log("first", data);
};

app.get("/", (req, res) => {
  testFondy();
  // sendTelegramMessage("ddd");
  res.send("Hello World!!!!!!!!!!");
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
