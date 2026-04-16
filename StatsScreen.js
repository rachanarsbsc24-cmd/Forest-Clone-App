import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getSessions, getStreak, getCoins } from './storage';

export default function StatsScreen() {
  const [sessions, setSessions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    setSessions(getSessions());
    setStreak(getStreak());
    setCoins(getCoins());
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0d3d1a' }}>
      <View style={{ alignItems: 'center', marginTop: 50 }}>

        {/* 🔥 STREAK */}
        <Text style={{ fontSize: 30, color: 'white' }}>
          🔥 Streak: {streak}
        </Text>

        {/* 💰 COINS */}
        <Text style={{ fontSize: 26, color: 'gold', marginTop: 10 }}>
          💰 Coins: {coins}
        </Text>

        {/* 📊 SESSIONS */}
        <Text style={{ fontSize: 20, color: 'white', marginTop: 20 }}>
          📊 Sessions:
        </Text>

        {sessions.map((s, i) => (
          <Text key={i} style={{ color: 'white', marginTop: 5 }}>
            🌳 {s.date}
          </Text>
        ))}

      </View>
    </ScrollView>
  );
}