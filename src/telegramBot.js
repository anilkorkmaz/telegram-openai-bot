import Telegram from 'node-telegram-bot-api';
import { getEnvirement } from "./util.js";

const telegramBot = new Telegram(getEnvirement("TELEGRAM_TOKEN"), { polling: true });

export default telegramBot;