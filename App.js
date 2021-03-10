/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';

import CardItemDetails from './screens/CardItemDetails';

import ProductItemDetails from './screens/ProductItemDetails';
import NewsItemDetails from './screens/NewsItemDetails';





import EditProfileScreen from './screens/EditProfileScreen';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import ConfirmScreen from './screens/ConfirmScreen';






import DiscountBigScreen from './screens/DiscountBigScreen';


import SettingsScreen from './screens/SettingsScreen';





import { AuthContext } from './components/context';

//import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createStackNavigator();
const RootStack = createStackNavigator();


const App = ({navigation}) => {

 
 

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = CustomDefaultTheme;

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  let userToken = null;

  useEffect(() => {
  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (e) {
      // Restoring token failed
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  };

  bootstrapAsync();
}, []);

  //const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );



  if( state.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }


  const RootStackScreen = ({navigation}) => (
      <RootStack.Navigator headerMode='none'>
          <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
          <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
          <RootStack.Screen name="ConfirmScreen" component={ConfirmScreen} options={{ headerShown: false }}/>
          <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown: false
            }}   
        />
      </RootStack.Navigator>
  );





  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { state.userToken !== null ? (
        <Drawer.Navigator headerMode='screen'>




        <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown: false
            }}   
        />

        <Drawer.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={{
                headerShown:false,  

            }} 
        />

      <Drawer.Screen 
            name="DiscountBigScreen" 
            component={DiscountBigScreen}
            options={{
                headerShown:false
            }}
        />




        <Drawer.Screen
            name="ProductItemDetails"
            component={ProductItemDetails}
            options={{
                headerShown:false,  
              
            }}
        />
        <Drawer.Screen
            name="NewsItemDetails"
            component={NewsItemDetails}
            options={{
              headerShown:false,  
                
            }}
        />


        <Drawer.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{headerShown: false}}
        />
        



      </Drawer.Navigator>
       
        



    
      )
    :
    <RootStackScreen/>
     
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;