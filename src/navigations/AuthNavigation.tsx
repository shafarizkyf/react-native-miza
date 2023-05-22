import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'screens/AuthScreen/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigation;
