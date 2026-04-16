import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getSessions, getStreak } from './storage';

export default function StatsScreen() {
  const [sessions, setSessions] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const data = getSessions();
    setSessions(data);
    setStreak(getStreak());
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0d3d1a' }}>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 30, color: 'white' }}>
          🔥 Streak: {streak}
        </Text>

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