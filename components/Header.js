import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import LOGO from '../assets/svg/logo.svg';
import BACK from '../assets/svg/back.svg';
import RELOAD from '../assets/svg/reload.svg';

const Header = (props) => {
  console.log(props.showReload)

  const [uniqueValue, setUniqueValue] = useState(1);

  const forceRemount = () => {
    setUniqueValue(uniqueValue +1)
    console.log('header reload')
  }

  const displayReload = () => {
    if (props.showReload) {
        return <TouchableOpacity style={styles.reload} onPress={() => forceRemount()}><RELOAD/></TouchableOpacity>;
    } else {
        return;
    }
  }

  const displayBack = () => {
    if (props.showBack) {
      return <TouchableOpacity style={styles.back} onPress={() => props.navigation.goBack()}><BACK/></TouchableOpacity>;
    } else {
        return ;
    }
  }


  return (
    <View style={styles.header}>  

      {displayBack()}
      
        <LOGO width="200" height="80" style={styles.logo}/>
      
      {displayReload()}   

    </View>      
  );
};

export default Header;

const styles = StyleSheet.create({
    header: {
      display: 'flex',
      position: 'relative',
      width: '100%',
       
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      zIndex: 99,
      flex: 1
    },
    logo: {
      // alignSelf: 'center',
 
      
    },
    back: {
      position: 'absolute',
      left: 20,   
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#999',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    reload: {
      position: 'absolute',
      right: 25,   
    }
});