import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { saveSession } from './storage';

export default function HomeScreen({ navigation }) {
  const TOTAL_TIME = 10;

  const [time, setTime] = useState(TOTAL_TIME);
  const [running, setRunning] = useState(false);
  const [tree, setTree] = useState('🌱');

  // 🌳 Dynamic Tree Logic
  const updateTree = (remainingTime) => {
    const progress = (TOTAL_TIME - remainingTime) / TOTAL_TIME;

    if (progress < 0.3) setTree('🌱');
    else if (progress < 0.7) setTree('🌿');
    else setTree('🌳');
  };

  useEffect(() => {
    let timer;

    if (running && time > 0) {
      timer = setTimeout(() => {
        const newTime = time - 1;
        setTime(newTime);
        updateTree(newTime);
      }, 1000);
    }

    if (time === 0) {
      setRunning(false);

      saveSession({
        date: new Date().toISOString()
      });

      alert('Session Completed 🌳 +10 Coins');

      setTime(TOTAL_TIME);
      setTree('🌱');
    }

    return () => clearTimeout(timer);
  }, [running, time]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#1b5e20',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      {/* 🌳 TREE */}
      <Text style={{ fontSize: 70 }}>{tree}</Text>

      {/* ⏱ TIMER */}
      <Text style={{ fontSize: 30, color: 'white' }}>
        {time}s
      </Text>

      {/* BUTTONS */}
      <Button title="Start" onPress={() => setRunning(true)} />
      <Button title="Pause" onPress={() => setRunning(false)} />
      <Button title="Reset" onPress={() => {
        setTime(TOTAL_TIME);
        setRunning(false);
        setTree('🌱');
      }} />

      <Button title="Stats" onPress={() => navigation.navigate('Stats')} />
    </View>
  );
}