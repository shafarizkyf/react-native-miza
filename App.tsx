import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AuthNavigation from 'navigations/AuthNavigation';
import AppContext, {AppContextProps} from 'context/AppContext';
import OnBoardingScreen from 'screens/OnBoardingScreen';
import SplashScreen from 'screens/SplashScreen';
import {SPLASH_SCREEN_DURATION} from 'config/splashscreen';
import {linking} from 'config/linking';
import Spinner from 'components/Spinner';
import {Linking, Platform} from 'react-native';
import localStorage, {STORAGE_KEYS} from 'utils/localStorage';
import MainNavigation from 'navigations/MainNavigation';

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

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('requestPermissions:', authStatus);
        }
      }

      if (Platform.OS === 'android') {
        const response = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        console.log('requestPermissions: ', response);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const isAuthenticated = async () => {
    try {
      return await localStorage.get(STORAGE_KEYS.USER);
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };

  const isOnBoarding = async () => {
    try {
      return await localStorage.get(STORAGE_KEYS.ONBOARDING);
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };

  const nextScreen = async () => {
    const [onboarding, user] = await Promise.all([
      isOnBoarding(),
      isAuthenticated(),
    ]);

    // user will be redirected to home screen if already logged in
    if (user) {
      setUser(user);
    }

    // skip onboarding if user already seen once
    if (onboarding) {
      setHasOnBoard(onboarding);
    }
  };

  /**
   * handle deep link
   */

  const handleDeepLink = async ({url}: {url: string}) => {
    console.log('url', url);
  };

  /**
   * splashcreen time and add analytic
   * skip onboarding process if the user already seen once
   */

  useEffect(() => {
    // add analytics
    analytics().logAppOpen();

    // remove splashscreen after a certain period of time
    const timeoutId = setTimeout(() => {
      setShowSplashScreen(false);
      nextScreen();
    }, Number(SPLASH_SCREEN_DURATION));
    return () => clearTimeout(timeoutId);
  }, []);

  /**
   * handle Push Notification
   */

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
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
        {user ? <MainNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
