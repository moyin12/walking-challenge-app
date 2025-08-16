import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Walking Challenge!</Text>
            <Button
                title="Join a Challenge"
                onPress={() => navigation.navigate('ChallengeScreen')}
            />
            <Button
                title="View Leaderboard"
                onPress={() => navigation.navigate('LeaderboardScreen')}
                style={{ marginTop: 10 }}
            />
        </View>
    );
};

export default HomeScreen;