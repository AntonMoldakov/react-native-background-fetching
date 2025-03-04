import {useEffect, useState} from 'react';
import BackgroundFetch from 'react-native-background-fetch';

// Minimum fetch interval is 15 minutes
export const useBackgroundEvents = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
      },
      async taskId => {
        await fetch('http://192.168.0.28:8080?method=backgroundEvent');
        console.log('useBackgroundEvents - fetched');
        setCount(prev => prev + 1);
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('Ошибка фоновой задачи:', error);
      },
    );

    BackgroundFetch.start();
    console.log('useBackgroundEvents - background start');

    return () => {
      console.log('useBackgroundEvents - background stop');
      BackgroundFetch.stop();
    };
  }, []);

  return {count};
};
