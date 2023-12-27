/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

if (global.BigInt === undefined) {
  const bi = require('big-integer');

  // Allow BigInt('0xffffffffffffffff') or BigInt('0x777777777777777777')
  global.BigInt = value => {
    if (typeof value === 'string') {
      // eslint-disable-next-line prefer-named-capture-group
      const match = value.match(/^0([xo])([0-9a-f]+)$/i);
      if (match) {
        return bi(match[2], match[1].toLowerCase() === 'x' ? 16 : 8);
      }
    }
    return bi(value);
  };
}

// Register background handler of push notification
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
