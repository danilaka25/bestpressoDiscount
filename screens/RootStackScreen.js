import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import ProductItemDetails from './ProductItemDetails';
import NewsItemDetails from './NewsItemDetails';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';


import SettingsScreen from './SettingsScreen';



import headerBg from "../assets/header_bg.jpg";



import BACK from '../assets/svg/back.svg';


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode='screen'>

        <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown: false
            }}
        />

        <RootStack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
                headerShown: false
            }}
        />

        <RootStack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{
                headerShown: false
            }}
        /> 

        <RootStack.Screen
            name="DiscountBigScreen"
            component={DiscountBigScreen}
            options={{
                headerShown: false
            }}
        />

        <RootStack.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={{
                //headerShown:false,  
                title: 'Заведения на карте',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // headerTransparent: true,
                // headerBackground: () => (
                //   <Image
                //       style={StyleSheet.absoluteFill}
                //       source={headerBg}
                //     />
                // ),
            }}
        />

        <RootStack.Screen
            name="ProductItemDetails"
            component={ProductItemDetails}
            options={{
                headerTransparent: true,
                // headerBackground: () => (
                //   <Image

                //       source={headerBg}
                //     />
                // ),
                //  headerStyle: {
                //     height: 74, 
                //   }
            }}
        />


        <RootStack.Screen
                    name="NewsItemDetails"
                    component={NewsItemDetails}
                    options={{
                        headerTransparent: true,
                        // headerBackground: () => (
                        //   <Image

                        //       source={headerBg}
                        //     />
                        // ),
                        //  headerStyle: {
                        //     height: 74, 
                        //   }
                    }}
                />


        <RootStack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
                headerTransparent: true,
                // headerBackground: () => (
                //   <Image

                //       source={headerBg}
                //     />
                // ),
                //  headerStyle: {
                //     height: 74, 
                //   }
                
            }}
        />





    </RootStack.Navigator>
);

export default RootStackScreen;