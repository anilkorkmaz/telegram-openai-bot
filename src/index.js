import telegramBot from "./telegramBot.js";
import openaiClient from "./openaiClient.js";
import { getEligibleGroupIds, getEligibleUserIds, getTranslate } from "./util.js";

telegramBot.onText(/\/answer (.+)/, async (msg, match) => {
  const {
    message_id: originalMessageId,
    chat: { id: chatId },
  } = msg;

  let askAi = filterChat(msg, telegramBot);
  if (!askAi) {
    telegramBot.sendMessage(chatId, getTranslate(msg.from.language_code), {
      reply_to_message_id: originalMessageId,
    });
    return;
  }

  let prompt = msg.text.replace("/cevapver ", "");
  try {
    const completion = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2048,
      temperature: 0.5,
    });
    telegramBot.sendMessage(chatId, completion.data.choices[0].text, {
      reply_to_message_id: originalMessageId,
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
    telegramBot.sendMessage(chatId, getTranslate(msg.from.language_code), {
      reply_to_message_id: originalMessageId,
    });
  }
});

const filterChat = (msg) => {
  let type = msg.chat.type;
  if (
    type === "supergroup" &&
    getEligibleGroupIds().some((e) => e === msg.chat.id)
  ) {
    return true;
  }

  if (type === "private" && getEligibleUserIds().some((e) => e === msg.chat.id)) {
    return true;
  }

  return false;
};
