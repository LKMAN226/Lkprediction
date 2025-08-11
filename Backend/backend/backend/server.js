const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Route pour tester si le serveur fonctionne
app.get("/", (req, res) => {
  res.send("LKprediction API fonctionne ✅");
});

// Route pour récupérer les matchs et cotes
app.get("/matches", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/odds",
      {
        params: {
          league: "140,39,501", // Liga, Premier League, Écosse
          season: "2024"
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur API :", error.message);
    res.status(500).json({ error: "Impossible de récupérer les données" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT} 🚀`);
});
