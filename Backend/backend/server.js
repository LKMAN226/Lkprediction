const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = process.env.RAPIDAPI_HOST;

// Test route
app.get('/', (req, res) => {
  res.send('✅ LKprediction API en ligne');
});

// Récupérer les cotes et stats
app.get('/odds/:leagueId', async (req, res) => {
  try {
    const { leagueId } = req.params;
    const response = await axios.get(
      `https://${API_HOST}/v2/odds/league/${leagueId}/bookmaker/5`,
      {
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});

// Récupérer les statistiques d’un match
app.get('/stats/:fixtureId', async (req, res) => {
  try {
    const { fixtureId } = req.params;
    const response = await axios.get(
      `https://${API_HOST}/v2/statistics/fixture/${fixtureId}`,
      {
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur LKprediction lancé sur le port ${PORT}`);
});
