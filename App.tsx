import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import AuthNavigation from 'navigations/AuthNavigation';
import AppContext, {AppContextProps} from 'context/AppContext';
import OnBoardingScreen from 'screens/OnBoardingScreen';
import SplashScreen from 'screens/SplashScreen';
import {SPLASH_SCREEN_DURATION} from 'config/splashscreen';
import {linking} from 'config/linking';
import Spinner from 'components/Spinner';
import {Linking} from 'react-native';

const App = () => {
  // to track current screen name
  const navigationRef = useRef<any>();
  const routeNameRef = useRef<string | undefined>(undefined);

  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const [hasOnboard, setHasOnBoard] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  // global state that can be managed accross all screens
  const appContext: AppContextProps = {
    user,
    setHasOnBoard,
    setUser,
  };

  /**
   * handle deep link
   */

  const handleDeepLink = async ({url}: {url: string}) => {
    console.log('url', url);
  };

  /**
   * splashcreen time and add analytic
   */

  useEffect(() => {
    analytics().logAppOpen();
    const timeoutId = setTimeout(() => {
      setShowSplashScreen(false);
    }, Number(SPLASH_SCREEN_DURATION));
    return () => clearTimeout(timeoutId);
  }, []);

  /**
   * add deep link listener
   */

  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });

    return () => linkingEvent.remove();
  }, [handleDeepLink]);

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
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
        linking={linking}
        fallback={<Spinner />}>
        <AuthNavigation />
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
