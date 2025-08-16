import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  OAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  DocumentData,
  Unsubscribe,
} from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  DATABASE_URL, // Keep this if you also use Realtime DB, otherwise remove
  GOOGLE_WEB_CLIENT_ID,
} from '@env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { Challenge } from '../types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY, // Use the imported variable directly
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  databaseURL: DATABASE_URL, // This is for Realtime Database, not Firestore
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports for Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app); // For Realtime Database

// --- Social Auth Configuration ---
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID, // Get this from your Google Cloud console
});

// --- Auth Functions ---
export const createUser = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = (): Promise<void> => {
  return signOut(auth);
};

// --- Social Auth Functions ---

export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    if (!idToken) {
      throw new Error('Google Sign-In failed: No ID token received.');
    }

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return signInWithCredential(auth, googleCredential);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('Google Sign-in was cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('Google Sign-in is already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('Google Play services are not available');
    } else {
      // some other error happened
      console.error(error);
    }
    throw error;
  }
};

export const signInWithApple = async (): Promise<UserCredential> => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Get the identity token
  const { identityToken, nonce } = appleAuthRequestResponse;

  if (!identityToken) {
    throw new Error('Apple Sign-In failed - no identity token returned');
  }

  // Create a Firebase credential with the token
  const appleCredential = new OAuthProvider('apple.com').credential({
    idToken: identityToken,
    rawNonce: nonce,
  });

  // Sign-in the user with the credential
  return signInWithCredential(auth, appleCredential);
};

// --- Firestore Functions ---
const challengesCollection = collection(firestore, 'challenges');

export const getChallenges = async (): Promise<Challenge[]> => {
  const challengesSnapshot = await getDocs(challengesCollection);
  return challengesSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Challenge)
  );
};

export const addChallenge = (
  challengeData: Omit<Challenge, 'id'>
): Promise<DocumentData> => {
  return addDoc(challengesCollection, challengeData);
};

export const subscribeToChallenges = (
  callback: (challenges: Challenge[]) => void
): Unsubscribe => {
  return onSnapshot(challengesCollection, (snapshot) => {
    const challenges = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Challenge)
    );
    callback(challenges);
  });
};
