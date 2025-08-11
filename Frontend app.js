lkprediction/
 ├── backend/          # Serveur Node.js (déjà fait)
 ├── frontend/         # Application mobile
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

export default function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/matches") // ⚠️ Remplacer par ton URL backend
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.response || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.league.name} - {item.teams.home.name} vs {item.teams.away.name}
            </Text>
            <Text style={styles.odds}>Date: {item.fixture.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: { padding: 15, marginBottom: 10, backgroundColor: "#f0f0f0", borderRadius: 8 },
  title: { fontSize: 16, fontWeight: "bold" },
  odds: { fontSize: 14, color: "#555" }
});
