import {useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';

// Doesn't work with new architecture https://github.com/Rapsssito/react-native-background-actions/issues/249

export const useIntensiveBackgroundEvents = () => {
  const [count, setCount] = useState(0);

  const backgroundTask = async () => {
    console.log('backgroundTask');

    while (true) {
      fetch('http://192.168.0.29:8080?method=intensiveBackgroundEvent');
      console.log('useIntensiveBackgroundEvents - sent');
      setCount(prev => prev + 1);
      await sleep(5000);
    }
  };

  useEffect(() => {
    BackgroundService.start(backgroundTask, options).then(() => {
      console.log('useIntensiveBackgroundEvents - started');
    });
    return () => {
      BackgroundService.stop().then(() => {
        console.log('useIntensiveBackgroundEvents - stopped');
      });
    };
  }, []);

  return {count};
};

const options = {
  taskName: 'GeoUploader',
  taskTitle: 'Отправка геоданных',
  taskDesc: 'Идет передача данных...',
  taskIcon: {name: 'ic_launcher', type: 'mipmap'},
};

const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));
