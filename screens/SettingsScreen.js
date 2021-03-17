import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { signOut } from './../redux/actions/authActions';

const SettingsScreen = (props) => {


  console.log("props SettingsScreen", props)

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('fireBaseToken');
      await AsyncStorage.removeItem('phoneNumber');
      props.signOut()
    } catch (e) {
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} showBack={true} showReload={false} />
      <View style={styles.content}>
        <Button
          style={styles.btn}
          title="Click Here"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <Button
          style={styles.btn}
          title="LOGOUT"
          onPress={() => { logOut() }}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default connect(null, mapDispatchToProps)(SettingsScreen);

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
