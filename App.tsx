import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import AuthNavigation from 'navigations/AuthNavigation';
import AppContext, {AppContextProps} from 'context/AppContext';
import OnBoardingScreen from 'screens/OnBoardingScreen';
import SplashScreen from 'screens/SplashScreen';
import {SPLASH_SCREEN_DURATION} from 'config/splashscreen';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const [hasOnboard, setHasOnBoard] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  // global state that can be managed accross all screens
  const appContext: AppContextProps = {
    user,
    setHasOnBoard,
    setUser,
  };

  useEffect(() => {
    analytics().logAppOpen();

    const timeoutId = setTimeout(() => {
      setShowSplashScreen(false);
    }, Number(SPLASH_SCREEN_DURATION));
    return () => clearTimeout(timeoutId);
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }

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
