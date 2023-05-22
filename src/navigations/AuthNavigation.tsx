import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from 'screens/AuthScreen/LoginScreen';
import SignupScreen from 'screens/AuthScreen/SignupScreen';

export type AuthParamlist = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export type AuthNavigationProps = StackNavigationProp<
  AuthParamlist,
  'LoginScreen'
>;

const Stack = createStackNavigator<AuthParamlist>();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigation;
