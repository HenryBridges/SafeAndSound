// SAFE AND SOUND PROJECT MOBILE-APP in React Native
// Team Members: Joao Garrido, Faisal Al Rajhi , Henry Ibeneme, Ryan Choi, Steven Pahyrya, Henry Bridges

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import DetailStack from './navigation/Stack';
import { useEffect } from 'react';
import { AuthContext } from './components/Other/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './screens/Splash';

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null
  };

  //hekps with the login, logout state across the app as in a global state
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signedIn: (token) => {
        dispatch({ type: 'LOGIN', token: token });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' });
      }
    }),
    []
  );

  //gets jwt token stored in the phone
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@jwt');
      dispatch({ type: 'LOGIN', token: token !== null ? token : null });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getToken();
    }, 1500);
  }, []);

  if (loginState.isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? <DetailStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
