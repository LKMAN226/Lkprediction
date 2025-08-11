// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuration API-Football
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = "api-football-v1.p.rapidapi.com";

// Récupérer les cotes d'un championnat spécifique
app.get("/odds/:leagueId/:page", async (req, res) => {
  try {
    const { leagueId, page } = req.params;
    const response = await axios.get(
      `https://${RAPID_API_HOST}/v2/odds/league/${leagueId}/bookmaker/5`,
      {
        params: { page },
        headers: {
          "x-rapidapi-host": RAPID_API_HOST,
          "x-rapidapi-key": RAPID_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des cotes:", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Statistiques d’un match
app.get("/stats/:fixtureId", async (req, res) => {
  try {
    const { fixtureId } = req.params;
    const response = await axios.get(
      `https://${RAPID_API_HOST}/v2/statistics/fixture/${fixtureId}`,
      {
        headers: {
          "x-rapidapi-host": RAPID_API_HOST,
          "x-rapidapi-key": RAPID_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des stats:", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route test
app.get("/", (req, res) => {
  res.send("API LKprediction backend en ligne ✅");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});add backend server.js
