/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import {
  // Provider as PaperProvider,
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
import EditProfileScreen from "./screens/EditProfileScreen";
import DiscountDescription from "./screens/DiscountDescription";


import { connect } from 'react-redux';
// import {Provider, connect} from 'react-redux';
// import {store} from './redux/store/createStore';
import { restoreToken, signIn, signOut } from './redux/actions/authActions';


import {
  IIKO_LOGIN,
  IIKO_PASS,
  IIKO_ORGANIZATION_ID,
} from "react-native-dotenv"; // added

import AsyncStorage from "@react-native-community/async-storage";

const MainStack = createStackNavigator();
const InitalStack = createStackNavigator();

const App = (props) => {


  //console.log('fireBaseToken', props.reducerData.fireBaseToken)


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

  const [iikoToken, setIikoToken] = useState(null);

  useEffect(() => {

    const getPhoneAndFRBTokenIfExist = async () => {

      let fireBaseToken;
      let phoneNumber;

      try {

        fireBaseToken = await AsyncStorage.getItem("fireBaseToken");
        phoneNumber = await AsyncStorage.getItem("phoneNumber");

      } catch (e) { }


      //console.log("getPhoneAndFRBTokenIfExist TOKEN", fireBaseToken)

      props.restoreToken(fireBaseToken) // dispatch

      return phoneNumber;
    };


    getPhoneAndFRBTokenIfExist()

    // getPhoneAndFRBTokenIfExist().then((phoneNumber) => {

    //   if (iikoToken == null) {
    //     getIikoAuthToken() // тут точно не устарел
    //       .then((token) => {

    //         return getIikoUserInfoByPhone(phoneNumber, token);
    //       })
    //       .then((userInfo) => {
    //         //setUserData(userData)

    //         //console.log("userData77", userInfo);

            
    //       });
    //   } else {
    //     checkIfIikoTokenIsValid(iikoToken);
    //   }
    // });




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

  };

  const addIikoUserByPhone = () => { };

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
      })
      .catch((err) => {
        //console.log(err);
      });
  };



  if (props.reducerData.isLoading) {
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


    <NavigationContainer theme={theme}>
      { console.log('APP fireBaseToken', props.reducerData.fireBaseToken)}
      <StatusBar hidden />
      {(props.reducerData.fireBaseToken == null) || (props.reducerData.fireBaseToken == 'undefined') ? (
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
      ) : (

          <MainStack.Navigator
            headerMode="screen"
            initialRouteName={HomeScreen}
          >
            <MainStack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
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
            <MainStack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="DiscountDescription"
              component={DiscountDescription}
              options={{ headerShown: false }}
            />
          </MainStack.Navigator>
        )}
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    reducerData: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  restoreToken: (fireBaseToken) => dispatch(restoreToken(fireBaseToken))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);

