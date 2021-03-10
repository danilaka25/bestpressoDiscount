/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Button } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";

import ProductItemDetails from "./screens/ProductItemDetails";
import NewsItemDetails from "./screens/NewsItemDetails";

import SplashScreen from "./screens/SplashScreen";
import SignInScreen from "./screens/SignInScreen";
import ConfirmScreen from "./screens/ConfirmScreen";

import DiscountBigScreen from "./screens/DiscountBigScreen";

import SettingsScreen from "./screens/SettingsScreen";

import {
  IIKO_LOGIN,
  IIKO_PASS,
  IIKO_ORGANIZATION_ID,
} from "react-native-dotenv";

import { AuthContext } from "./components/context";
import AsyncStorage from "@react-native-community/async-storage";

const MainStack = createStackNavigator();
const InitalStack = createStackNavigator();

const App = ({ navigation }) => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const theme = CustomDefaultTheme;

  const initialLoginState = {
    isLoading: true,
    isSignout: false,
    fireBaseToken: null,
    userInfo: null,
  };

  const loginReducer = (prevState, action) => {
    //console.log("action", action);

    switch (action.type) {
      case "RESTORE_TOKEN":
        return {
          ...prevState,
          fireBaseToken: action.fireBaseToken,
          isLoading: false,
        };
      case "SIGN_IN":
        return {
          ...prevState,
          isSignout: false,
          fireBaseToken: action.fireBaseToken,
        };
      case "SIGN_OUT":
        return {
          ...prevState,
          isSignout: true,
          fireBaseToken: null,
        };
      // case "GET_USER_DATA":
      //   return {
      //     ...prevState,
      //     userInfo: action.userInfo,
      //   };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const [iikoToken, setIikoToken] = useState(null);


  useEffect(() => {
 
    const bootstrapAsync = async () => {
      let fireBaseToken;
      let tempToken;
      let phoneNumber;

      try {
        fireBaseToken = await AsyncStorage.getItem("fireBaseToken");
        //iikoToken = await getIikoAuthToken()
        //tempToken = await AsyncStorage.getItem('iikoToken');
        phoneNumber = await AsyncStorage.getItem("phoneNumber");

        //setIikoToken(tempToken);

        //await getIikoAuthToken()
      } catch (e) {}

      console.log("useEffect 1", fireBaseToken);
      console.log("useEffect 2", phoneNumber);

      dispatch({ type: "RESTORE_TOKEN", fireBaseToken: fireBaseToken });

      setTimeout(async () => {
        console.log("useEffect 3", loginState.fireBaseToken);
      }, 1000);

      return phoneNumber;
    };

    bootstrapAsync().then((phoneNumber) => {
      
 
      if (iikoToken == null) {
        getIikoAuthToken() // тут точно не устарел
          .then((token) => {
            //console.log("storage phone", phoneNumber)
            return getIikoUserInfoByPhone(phoneNumber, token);
          })
          .then((userInfo) => {
            //setUserData(userData)

            //dispatch({ type: "GET_USER_DATA", userInfo: userInfo });

            //console.log("userData77", userData); 999

            //setUserInfo(userData); ///тут dispatch
          });
      } else {
        checkIfIikoTokenIsValid(iikoToken);
      }
    });
  }, []);

  const getIikoAuthToken = () => {
    return fetch(
      "https://card.iiko.co.uk/api/0/auth/access_token?user_id=" +
        IIKO_LOGIN +
        "&user_secret=" +
        IIKO_PASS,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log("getIikoAuthToken", responseJson);
        //setIikoToken(responseJson)
        return responseJson;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getIikoUserInfoByPhone = (phone, token) => {
    return fetch(
      "https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=" +
        token +
        "&organization=" +
        IIKO_ORGANIZATION_ID +
        "&phone=" +
        phone,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log("UserInfoByPhone", responseJson);

        return responseJson;
      })
      .catch((err) => {
        console.log(err);
      });

    //https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=AjMpEsEaZTICr-Y_NKOEZoe9wi7CtWj0lt4oUFEkrGC5qG4YxyVjrTWTbenM2YnbTrM_JelKFdT3drTdBWIOSQ2&organization=b2320000-3838-06a2-325f-08d8dd70e15d&phone=+380632373202
  };

  const addIikoUserByPhone = () => {};

  const checkIfIikoTokenIsValid = (iikoToken) => {
    return fetch(
      "https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=" +
        iikoToken,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //setIikoResponseCode(responseJson.code)
        console.log("checkIfIikoTokenIsValid");

        if (responseJson.code == 201) {
          return false;
        } else {
          return true;
        }

        //return responseJson.code
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      ///userInfo: () => dispatch({ type: GET_USER_DATA, userInfo: userInfo }),
    }),
    []
  );

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ccc",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext} >  
      {/* value={loginState.userInfo} */}
        <NavigationContainer theme={theme}>
          {loginState.fireBaseToken !== null ? (
            <MainStack.Navigator
              headerMode="screen"
              initialRouteName={HomeScreen}

              // loginState.fireBaseToken !== null ? HomeScreen : SplashScreen
            >
              <MainStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
                props={123}
              />
              <MainStack.Screen
                name="ExploreScreen"
                component={ExploreScreen}
                options={{
                  headerShown: false,
                }}
              />
              <MainStack.Screen
                name="DiscountBigScreen"
                component={DiscountBigScreen}
                options={{
                  headerShown: false,
                }}
              />
              <MainStack.Screen
                name="ProductItemDetails"
                component={ProductItemDetails}
                options={{
                  headerShown: false,
                }}
              />
              <MainStack.Screen
                name="NewsItemDetails"
                component={NewsItemDetails}
                options={{
                  headerShown: false,
                }}
              />
              <MainStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerShown: false }}
              />
            </MainStack.Navigator>
          ) : (
            <InitalStack.Navigator initialRouteName={SplashScreen}>
              <InitalStack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <InitalStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false }}
              />
              <InitalStack.Screen
                name="ConfirmScreen"
                component={ConfirmScreen}
                options={{ headerShown: false }}
              />
            </InitalStack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
