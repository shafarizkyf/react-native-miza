import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardingScreen from 'screens/OnBoardingScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="OnBoardingScreen"
      component={OnBoardingScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigation;
