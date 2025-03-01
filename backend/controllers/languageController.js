import { Translate } from "@google-cloud/translate/build/src/v2/index.js";


const translate = new Translate({
  key: "AIzaSyBxnFzckxpYcDCQ2NcegIbBNUDYfbjt2DQ", // Use your API key
});

const languagesController = async (req, res) => {
  try {
    const [languages] = await translate.getLanguages();
    console.log(languages)
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch languages" });
  }
};
export default languagesController;