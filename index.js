const express = require("express");
const OpenAI = require("openai");
const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

app.post("/jarvis", async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres JARVIS. Responde de forma breve y elegante al Usuario 2469398380. Si te pide acciones, confirma que las harás." },
                { role: "user", content: req.body.text }
            ],
        });
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor de JARVIS" });
    }
});

app.listen(port, () => console.log(`JARVIS activo`));
