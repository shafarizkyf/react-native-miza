import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from 'screens/AuthScreen/LoginScreen';
import SignupScreen from 'screens/AuthScreen/SignupScreen';
import OTPScreen from 'screens/AuthScreen/OTPScreen';
import StackHeader from './components/StackHeader';
import color from 'styles/color';

export type AuthParamlist = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  OTPScreen: undefined;
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
    <Stack.Screen
      name="OTPScreen"
      component={OTPScreen}
      options={{
        header: props => <StackHeader {...props} />,
        cardStyle: {
          backgroundColor: color.stackCardColor,
        },
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigation;
