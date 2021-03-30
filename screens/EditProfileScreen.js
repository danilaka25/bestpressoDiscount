import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from "../components/Header";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import bgImage from "../assets/pattern2.jpg";
import { connect } from 'react-redux';
import { signOut } from './../redux/actions/authActions';
import { fetchUserData } from './../redux/actions/fetchUserData';


import {
  IIKO_LOGIN,
  IIKO_PASS,
  IIKO_ORGANIZATION_ID,
} from "react-native-dotenv";

const EditProfileScreen = (props) => {


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');



  const logOut = async () => {
    //console.log("signOut")
    try {
      await AsyncStorage.removeItem('fireBaseToken');
      await AsyncStorage.removeItem('phoneNumber');
      props.signOut()
    } catch (e) {
    }
  }


  useEffect(() => {


    setName(props.userDataReducer.iikoUserData.name)
    setSurname(props.userDataReducer.iikoUserData.surname)


  }, []);


  var phoneNumber;
  var iikoToken;




  const getIikoAuthToken = async () => {
    phoneNumber = await AsyncStorage.getItem("phoneNumber");
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
      .then((token) => {
        iikoToken = token
      })
      .catch((err) => { });
  }


  const updateIikoUserData = (phoneNumber, iikoToken, name, surname) => {
    fetch(
      "https://card.iiko.co.uk/api/0/customers/create_or_update?access_token=" +
      iikoToken +
      "&organization=" +
      IIKO_ORGANIZATION_ID,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: { surName: surname, name: name, phone: phoneNumber },
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        setName(name)
        setSurname(surname)
      })
      .then((response) => {
        props.fetchUserData()
        Alert.alert("Спасибі, ми зберегли ваші дані");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };



  const saveUserData = () => {


    console.log(props.userDataReducer.iikoUserData)

    getIikoAuthToken().then(() => {

      updateIikoUserData(phoneNumber, iikoToken, name, surname)

    })

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


       <Text style={styles.formTitle}> Розкажи про себе більше</Text>



          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Ім'я"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={
                styles.textInput
              }
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Прізвище"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={
                styles.textInput
              }
              onChangeText={text => setSurname(text)}
            />
          </View>

          <TouchableOpacity style={styles.commandButton} onPress={() => { saveUserData() }}>
            <Text style={styles.panelButtonTitle}>Зберегти дані</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.scrennInner}>
          <Text>Ласкаво просимо {name} {surname}</Text>
        </View>



        <View style={styles.exitScrennInner}>
          <TouchableOpacity style={styles.exitButton} onPress={() => { logOut() }}>
            <Text style={styles.exitButtonTitle}>Вийти з облікового запису</Text>
          </TouchableOpacity>
        </View>




      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userDataReducer: state.userDataReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  fetchUserData: () => dispatch(fetchUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);

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
  formTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20

  },
  scrennInner: {
    marginBottom: 20,
    width: "90%",
    //justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "center",
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 20
  },


  exitScrennInner: {
    position: 'absolute',
    bottom: 20,
    width: "90%",
    //justifyContent: "space-between",
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
  exitButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  exitButtonTitle: {
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
