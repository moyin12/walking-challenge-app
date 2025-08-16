import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import AppleHealthKit from 'react-native-health';
import GoogleFit, { Scopes } from 'react-native-google-fit';

const healthService = {
  requestPermissions: async () => {
    if (Platform.OS === 'ios') {
      return new Promise((resolve, reject) => {
        const options = {
          permissions: {
            read: [AppleHealthKit.Constants.Permissions.StepCount],
          },
        };

        AppleHealthKit.initHealthKit(options, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
  },

  fetchStepCount: async (startDate, endDate) => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        const options = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };

        AppleHealthKit.getStepCount(options, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      } else {
        const options = {
          startDate: startDate.getTime(),
          endDate: endDate.getTime(),
          bucketUnit: 'day',
          bucketInterval: 1,
        };

        GoogleFit.getDailyStepCountSamples(options, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
    });
  },
};

export default healthService;