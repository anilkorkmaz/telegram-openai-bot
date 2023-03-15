import { Configuration, OpenAIApi } from "openai";
import { getEnvirement } from "./util.js";

const config = new Configuration({
  apiKey: getEnvirement("OPENAI_TOKEN"),
});

const openaiClient = new OpenAIApi(config);
export default openaiClient;
