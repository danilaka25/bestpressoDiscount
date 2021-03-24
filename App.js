/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StatusBar , Dimensions} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
import { restoreToken } from './redux/actions/authActions';
import AsyncStorage from "@react-native-community/async-storage";

const MainStack = createStackNavigator();
const InitalStack = createStackNavigator();

const windowHeight = Dimensions.get('window').height;
let smallScreen = false
if (windowHeight <= 550) {
  smallScreen = true
}

const App = (props) => {

  useEffect(() => {

    const getPhoneAndFRBTokenIfExist = async () => {
      let fireBaseToken;
      let phoneNumber;

      try {
        fireBaseToken = await AsyncStorage.getItem("fireBaseToken");
        phoneNumber = await AsyncStorage.getItem("phoneNumber");
      } catch (e) {

      }
      props.restoreToken(fireBaseToken) // dispatch
    }

    getPhoneAndFRBTokenIfExist()

  }, []);

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
    <NavigationContainer  >
      <StatusBar hidden />
      {(props.reducerData.fireBaseToken == null) || (props.reducerData.fireBaseToken == 'undefined') ? (
        <InitalStack.Navigator initialRouteName={SplashScreen}  >
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
              initialState={{abc: '2131232132132'}}     
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

