import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChallengeCardProps {
  challengeName: string;
  participants: number;
  progress: number; // Progress as a percentage
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challengeName, participants, progress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{challengeName}</Text>
      <Text style={styles.participants}>{participants} Participants</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progress}% Completed</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  participants: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
});

export default ChallengeCard;