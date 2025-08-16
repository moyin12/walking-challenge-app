import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getLeaderboardData } from '../api/firebase';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboardData();
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.rank}>{item.rank}</Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.steps}>{item.steps} steps</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        renderItem={renderItem}
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
  },
  steps: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Leaderboard;