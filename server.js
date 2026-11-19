import express from "express";
import { Mistral } from "@mistralai/mistralai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
const MODEL = "mistral-small-latest";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Champ 'messages' requis (tableau au format chat)." });
  }
  if (!process.env.MISTRAL_API_KEY) {
    return res.status(500).json({ error: "MISTRAL_API_KEY n'est pas configurée côté serveur." });
  }

  try {
    const response = await mistral.chat.complete({
      model: MODEL,
      messages,
    });

    const content = response?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || content.length === 0) {
      return res.status(502).json({ error: "Réponse inattendue de l'API Mistral." });
    }
    res.json({ reply: content });
  } catch (err) {
    console.error("Erreur API Mistral:", err?.message ?? err);
    res.status(502).json({ error: "Échec de l'appel à l'API Mistral." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
