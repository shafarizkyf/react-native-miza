import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from 'navigations/AuthNavigation';
import AppContext, {AppContextProps} from 'context/AppContext';
import OnBoardingScreen from 'screens/OnBoardingScreen';

const App = () => {
  const [hasOnboard, setHasOnBoard] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  // global state that can be managed accross all screens
  const appContext: AppContextProps = {
    user,
    setHasOnBoard,
    setUser,
  };

  if (!hasOnboard) {
    return (
      <AppContext.Provider value={appContext}>
        <OnBoardingScreen />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={appContext}>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
