import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createChallenge, joinChallenge } from '../api/firebase';

const ChallengeScreen = () => {
  const [challengeCode, setChallengeCode] = useState('');
  const [challengeName, setChallengeName] = useState('');

  const handleCreateChallenge = async () => {
    if (challengeName) {
      const code = await createChallenge(challengeName);
      alert(`Challenge created! Share this code: ${code}`);
    } else {
      alert('Please enter a challenge name.');
    }
  };

  const handleJoinChallenge = async () => {
    if (challengeCode) {
      const success = await joinChallenge(challengeCode);
      if (success) {
        alert('Successfully joined the challenge!');
      } else {
        alert('Failed to join the challenge. Please check the code.');
      }
    } else {
      alert('Please enter a challenge code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Walking Challenge</Text>
      <TextInput
        style={styles.input}
        placeholder="Challenge Name"
        value={challengeName}
        onChangeText={setChallengeName}
      />
      <Button title="Create Challenge" onPress={handleCreateChallenge} />
      <TextInput
        style={styles.input}
        placeholder="Challenge Code"
        value={challengeCode}
        onChangeText={setChallengeCode}
      />
      <Button title="Join Challenge" onPress={handleJoinChallenge} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ChallengeScreen;