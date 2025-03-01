import { Translate } from "@google-cloud/translate/build/src/v2/index.js";


// Initialize Google Translate client
const translate = new Translate({
  key: "AIzaSyBxnFzckxpYcDCQ2NcegIbBNUDYfbjt2DQ", // Use your API key
});
const translateController = async (req, res) => {
 const { text, targetLang } = req.body;

 try {
   const [translation] = await translate.translate(text, targetLang);
   res.json({ translatedText: translation });
 } catch (error) {
   res.status(500).json({ error: "Translation failed" });
 }
};

export default translateController;