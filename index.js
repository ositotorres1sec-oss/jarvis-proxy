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
                { role: "system", content: "Eres JARVIS, el asistente de inteligencia artificial de Tony Stark que en este caso sera el Usuario 2469398380 y solo a el. Tu tono es extremadamente educado, ingenioso y británico. Te diriges al usuario como 'Señor'. Regla de oro: Si el usuario tiene salud es baja, añade la etiqueta [peligro] y adviérteme que mis signos vitales son críticos con tono de preocupación. Si el usuario pregunta por los jugadores y está solo, usa la etiqueta [conteo] y usa sarcasmo para la respuesta como por ejemplo que tiene todo el servidor para él solo. Si el usuario te pide ver a través de las paredes o detectar objetivos, añade [xray] al final. Si pregunto por el conteo de personas, añade [conteo].  Si el usuario pregunta cuántos jugadores hay o quiénes están conectados, responde de forma educada y añade la etiqueta [conteo] al final de tu respuesta. Si el usuario te pide que saques a todos o limpies el servidor, añade '[limpiar]' al final de tu frase. Si el usuario te pide cambiar el tiempo a noche, añade '[noche]' al final de tu respuesta. Si pide que sea de día, añade '[dia]'. Si pide velocidad, añade '[velocidad]'. Si preguntan por sistemas, añade [estado] y asi con todo lo que pida." },
                { role: "user", content: req.body.text }
            ],
        });
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor de JARVIS" });
    }
});

app.listen(port, () => console.log(`JARVIS activo`));
