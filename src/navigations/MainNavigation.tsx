import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeScreen from 'screens/HomeScreen';

export type AuthParamlist = {
  HomeScreen: undefined;
};

export type MainNavigationProps = StackNavigationProp<
  AuthParamlist,
  'HomeScreen'
>;

const Stack = createStackNavigator<AuthParamlist>();

const MainNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default MainNavigation;
