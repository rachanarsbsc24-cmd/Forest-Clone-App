import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { saveSession } from './storage';

export default function HomeScreen({ navigation }) {
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);
  const [tree, setTree] = useState('🌱');

  useEffect(() => {
    let timer;

    if (running && time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);

      if (time <= 7) setTree('🌿');
      if (time <= 3) setTree('🌳');
    }

    if (time === 0) {
      setRunning(false);

      saveSession({
        date: new Date().toISOString()
      });

      alert('Session Completed 🌳');

      setTime(10);
      setTree('🌱');
    }

    return () => clearTimeout(timer);
  }, [running, time]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1b5e20',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 60 }}>{tree}</Text>
      <Text style={{ fontSize: 30, color: 'white' }}>{time}s</Text>

      <Button title="Start" onPress={() => setRunning(true)} />
      <Button title="Pause" onPress={() => setRunning(false)} />
      <Button
        title="Reset"
        onPress={() => {
          setTime(10);
          setRunning(false);
          setTree('🌱');
        }}
      />

      <Button title="Stats" onPress={() => navigation.navigate('Stats')} />
    </View>
  );
}