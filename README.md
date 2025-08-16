# Walking Challenge App

## Overview
The Walking Challenge App is a cross-platform mobile application designed to facilitate group walking challenges. Users can create and join challenges, track their steps, and view a real-time leaderboard. The app integrates with Apple HealthKit for iOS and Google Fit for Android to collect step data.

## Features
- Create and join walking challenges via shareable links.
- Track steps using Apple HealthKit (iOS) and Google Fit (Android).
- Real-time leaderboard displaying user rankings based on step counts.

## Technology Stack
- **Framework**: React Native
- **Backend**: Firebase (for user authentication, data storage, and real-time functionality)

## Project Setup

### Prerequisites
- Node.js installed on your machine.
- npm or yarn for package management.
- Firebase account for backend services.

### Installation Steps
1. Clone the repository:
   ```
   git clone <repository-url>
   cd walking-challenge-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project in the Firebase console.
   - Add your app to the Firebase project (both iOS and Android).
   - Configure authentication methods (e.g., email/password, Google).
   - Enable Firestore for data storage.

4. Configure Firebase in the app:
   - Update `src/api/firebase.ts` with your Firebase project credentials.

5. Run the application:
   - For iOS:
     ```
     npx react-native run-ios
     ```
   - For Android:
     ```
     npx react-native run-android
     ```

## Directory Structure
- `src/api`: Contains Firebase configuration and API functions.
- `src/components`: Reusable UI components.
- `src/hooks`: Custom hooks for managing state and side effects.
- `src/navigation`: Navigation setup for the app.
- `src/screens`: Different screens of the application.
- `src/services`: Services for integrating with health data APIs.
- `src/types`: TypeScript types and interfaces.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.