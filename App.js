import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppDrawer from './navigation/AppDrawer';
import { useEffect } from 'react';
import { AuthContext } from './components/Other/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './screens/Splash';

<<<<<<< HEAD
const App = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };
=======
const hasLoggedIn = true;
>>>>>>> 066c6bb (Added vector icons package and its settings, made custom drawer content component for the menu screen, created a new account screen and removed old non-used screens)

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: falsem
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signedIn: (token) => {
      dispatch({ type: 'LOGIN', token: token });
    },
    signOut: () => {
      dispatch({ type: 'LOGOUT' });
    },
  }), []);


  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@jwt');
      if (token !== null) {
        {
          dispatch({ type: 'LOGIN', token: token });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch({ type: 'LOGOUT' })
    setTimeout(() => {
      // getToken();
    }, 1500);
  }, []);

  if (loginState.isLoading) {
    return (
      <Splash />
    );
  }

  return (
    <AuthContext.Provider value={authContext} >
      <NavigationContainer>
        {loginState.userToken !== null ? <AppDrawer /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;