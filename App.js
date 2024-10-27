// Import dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useMemo, useReducer } from 'react';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

// Import screens
import Onboarding from "./screens/Onboarding";
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home'


// reateNativeStackNavigator instance
const Stack = createNativeStackNavigator();

// App entry point
export default function App({ navigation }) {

  // Global state with useReducer instance (onboarding status)
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'onboard':
          return {
            ...prevState,
            isLoading: false,
            isOnboardingCompleted: action.isOnboardingCompleted,
          };
      }
    },
    {
      isLoading: true,
      isOnboardingCompleted: false,
    }
  );
  // useEffect hook (get profile info from AsyncStorage if existing)
  useEffect(() => {
    (async () => {
      let profileData = [];
      try {
        const getProfile = await AsyncStorage.getItem('profile');
        if (getProfile !== null) {
          profileData = getProfile;
        }
      } catch (e) {
        console.error(e);
      } finally {
        if(Object.keys(profileData).length != 0) {
          dispatch({ type: 'onboard', isOnboardingCompleted: true });
        } else {
          dispatch({ type: 'onboard', isOnboardingCompleted: false });
        }
      }

    })();
  }, []);

  // useMemo Hook (set profile info in AsyncStorage)
  const authContext = useMemo(
    () => ({
      onboard: async (data) => {
        try {
          const jsonValue = JSON.stringify(data)
          await AsyncStorage.setItem("profile", jsonValue)
        } catch (e) {
          console.error(e);
        }

        dispatch({ type: 'onboard', isOnboardingCompleted: true });
      },
      update: async (data) => {
        try {
          const jsonValue = JSON.stringify(data)
          await AsyncStorage.setItem("profile", jsonValue)
        } catch (e) {
          console.error(e);
        }

        Alert.alert("Success", "Successfully saved changes!")
      },
      logout: async () => {
        try {
          await AsyncStorage.clear()
        } catch (e) {
          console.error(e);
        }

        dispatch({ type: 'onboard', isOnboardingCompleted: false });
      },
    }),
    []
  );

  // Call SplashScreen when application is in loading state (see useReducer hook)
  if (state.isLoading) {
    return <SplashScreen />;
  }
// Return Home and Profile components or Onboarding component if not completed
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isOnboardingCompleted ? (
            <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen name="Onboarding" component={Onboarding} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}