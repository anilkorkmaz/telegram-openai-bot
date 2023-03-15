import { i18n } from "./i18n.js";
import EnvNotFoundException from "./exception/EnvNotFoundException.js";
import dotenv from "dotenv";
dotenv.config();

export const getEnvirement = (name) => {
  let env = process.env[name];
  if (!env) {
    throw new EnvNotFoundException(name);
  }
  return env;
};

const stringToNumberArray = (str) => {
  let idsStringArray = str.split(",");
  if (idsStringArray.length < 0) {
    return [];
  }
  let arr = [];
  for (var i = 0; i < idsStringArray.length; i++) {
    arr[i] = Number(idsStringArray[i]);
  }
  return arr;
};

export const getEligibleGroupIds = () => {
  let arr = [];
  try {
    arr = stringToNumberArray(getEnvirement("ELIGIBLE_TELEGRAM_GROUP_IDS"));
  } catch (e) {
    console.error(e);
    return arr;
  }
};

export const getEligibleUserIds = () => {
  let arr = [];
  try {
    arr = stringToNumberArray(getEnvirement("ELIGIBLE_TELEGRAM_USER_IDS"));
  } catch (e) {
    console.error(e);
    return arr;
  }
};

export const getTranslate = (lang = "tr") => {
  return i18n[lang].noAnswer;
};
