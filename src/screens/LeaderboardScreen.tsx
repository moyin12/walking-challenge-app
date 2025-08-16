import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Leaderboard from '../components/Leaderboard';
import { fetchLeaderboardData } from '../api/firebase';

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const getLeaderboardData = async () => {
      const data = await fetchLeaderboardData();
      setLeaderboardData(data);
    };

    getLeaderboardData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        renderItem={({ item }) => <Leaderboard entry={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default LeaderboardScreen;