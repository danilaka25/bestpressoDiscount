import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from "../components/Header";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import bgImage from "../assets/pattern2.jpg";
import { connect } from 'react-redux';
import { signOut } from './../redux/actions/authActions';

const EditProfileScreen = (props) => {


  const logOut = async () => {
    console.log("signOut")
    try {
      await AsyncStorage.removeItem('fireBaseToken');
      await AsyncStorage.removeItem('phoneNumber');
      props.signOut()
    } catch (e) {
    }
  }






  return (

    <View style={styles.container}>

    <ImageBackground
            source={bgImage}
            resizeMode="repeat"
            style={styles.bgImage}
          >


    


      <View style={styles.logoContainer}>
        <Header navigation={props.navigation} showBack={true} showInfo={true} />      
      </View>

      <View style={styles.scrennInner}>    



      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={
            styles.textInput

          }
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={
            styles.textInput

          }
        />
      </View>


      <View style={styles.action}>
        <FontAwesome name="envelope-o" size={20} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCorrect={false}
          style={
            styles.textInput

          }
        />
      </View>


      <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.commandButton} onPress={() => { logOut() }}>
        <Text style={styles.panelButtonTitle}>LOG OUT</Text>
      </TouchableOpacity>






      </View>
      
      
      
      
      </ImageBackground>
    </View>
  );
};



const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default connect(null, mapDispatchToProps)(EditProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },

  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },


  scrennInner: {
    width: "90%",  
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "center",
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 20
  },



  logoContainer: {
    height: 70,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  btn: {
    marginTop: 20,
    marginBottom: 50
  }
});
