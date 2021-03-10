import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../components/Header';


import{ AuthContext } from '../components/context';



const SettingsScreen = ({navigation}) => {

  const { signOut } = React.useContext(AuthContext);

    const logOut = async () => {   
      try {
          await AsyncStorage.removeItem('fireBaseToken');
          await AsyncStorage.removeItem('phoneNumber');
          signOut()
          console.log('f(signOut)')
      } catch(e) {
        // remove error
      }       
      //navigation.navigate('SplashScreen')
    }

    return (
      <View style={styles.container}>

        <Header navigation={navigation} showBack={true} showReload={false} />     
        <View style={styles.content}>
        <Button
          style={styles.btn}
          title="Click Here"
          onPress={() => navigation.navigate('HomeScreen')}
        />

        <Button
          style={styles.btn}
          title="LOGOUT"
          onPress={() => {logOut()}}
        />
        </View>

      </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
  content: {
    flex: 1, 
    alignItems: 'center', 
    marginTop: 140,
  },  
  btn: {
    marginTop: 20,
    marginBottom: 50
  }
});
