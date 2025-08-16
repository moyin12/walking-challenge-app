import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { requestAuthorization, getStepCount } from '../services/healthService';

const useStepCounter = () => {
  const [stepCount, setStepCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeStepCounter = async () => {
      try {
        await requestAuthorization();
        const steps = await getStepCount();
        setStepCount(steps);
      } catch (err) {
        setError(err);
      }
    };

    initializeStepCounter();

    const interval = setInterval(async () => {
      try {
        const steps = await getStepCount();
        setStepCount(steps);
      } catch (err) {
        setError(err);
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return { stepCount, error };
};

export default useStepCounter;