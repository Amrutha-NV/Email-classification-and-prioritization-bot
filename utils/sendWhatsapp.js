require('dotenv').config();
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsappMessage(message) {
  try {
    const response = await client.messages.create({
      from: "whatsapp:+14155238886",                      // Twilio sandbox WhatsApp number
      to: `whatsapp:${process.env.TEST_WHATSAPP_NUMBER}`, // Always sending to env phone number
      body: message,                                      // Text body
    });

    console.log("WhatsApp message sent successfully:", response.sid);
  } catch (err) {
    console.error("WhatsApp send error:", err.message);
  }
}

module.exports = sendWhatsappMessage;
