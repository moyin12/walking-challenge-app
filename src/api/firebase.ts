import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase authentication
export const auth = firebase.auth();

// Firestore database
export const firestore = firebase.firestore();

// Realtime database
export const database = firebase.database();

// Function to create a new user
export const createUser = async (email, password) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

// Function to sign in a user
export const signInUser = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

// Function to sign out a user
export const signOutUser = async () => {
  return await auth.signOut();
};

// Function to get challenges from Firestore
export const getChallenges = async () => {
  const challengesSnapshot = await firestore.collection('challenges').get();
  return challengesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to add a new challenge
export const addChallenge = async (challengeData) => {
  return await firestore.collection('challenges').add(challengeData);
};

// Function to subscribe to real-time updates for challenges
export const subscribeToChallenges = (callback) => {
  return firestore.collection('challenges').onSnapshot(snapshot => {
    const challenges = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(challenges);
  });
};