import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  StyleSheet,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  


} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CheckBox from 'react-native-check-box'
import auth from "@react-native-firebase/auth";
import bgImage from "../assets/pattern2.jpg";
import LOGO from "../assets/svg/logo.svg";

import HTMLView from "react-native-htmlview";

const screen = Dimensions.get('screen').height;
const window = Dimensions.get('window').height;
const height_logo = screen * 0.38;


const SignInScreen = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [disableBtn, setDisableBtn] = useState(true)
  const [toggleCheckBox, setToggleCheckBox] = useState(true)

  const onChangedPhone = (inputPhone) => {
    let validPhone = "";
    let numbers = "0123456789";
    for (var i = 0; i < inputPhone.length; i++) {
      if (numbers.indexOf(inputPhone[i]) > -1) {
        validPhone = validPhone + inputPhone[i];
        if (validPhone.length == 10) {
          setDisableBtn(false);
        } else {
          setDisableBtn(true);
        }
      } else {
        Alert.alert("Вводити лише цифри");
      }
    }
    setPhoneNumber(validPhone);
  };

  const onChangedPrivatePolicy = () => {
    setToggleCheckBox(!toggleCheckBox)
  }

  useEffect(() => {
    if (toggleCheckBox && (phoneNumber.length == 10)) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [toggleCheckBox, phoneNumber]);


  async function signInWithPhoneNumber(phoneNumber) {
    let prefix = "+38";
    if (phoneNumber.length == 10) {
      let confirmation;
       try {
         confirmation = await auth().signInWithPhoneNumber(
          prefix + phoneNumber
        )
       } catch(err) {
         console.log("Err or", err)
        Alert.alert(err.toString());
       }


      
      //Alert.alert(confirmation);
      navigation.navigate("ConfirmScreen", { confirm: confirmation, phoneNumber: phoneNumber }, navigation);
    } else {
      Alert.alert("Неправильний номер телефону");
    }
  }

  return (

    <ImageBackground
      source={bgImage}
      resizeMode="repeat"
      style={styles.bgImage}>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={
          Platform.select({
            ios: () => 0,
            android: () => -40
          })()
        }
        style={{ flex: 1 }}
      >

        <SafeAreaView style={styles.container}>
          <View style={styles.inner}>
           
              <Animatable.View
                style={styles.header}
                animation="bounceIn"
                duraton="3500"
              >
                <LOGO width="290" height="100" />
              </Animatable.View>
              <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
              >
                <Text style={styles.title}>Введіть свій номер телефону</Text>
                <Text style={styles.desc}>
                  Що би змогли прив'язати вашу дисконтну карту до телефону
              </Text>
                <View style={styles.button}>
                  <View style={styles.fieldInputRow}>
                    <Text style={styles.fieldInputPrefix}>+38</Text>
                    <TextInput
                      style={styles.fieldInput}
                      value={phoneNumber}
                      onChangeText={(text) => onChangedPhone(text)}
                      placeholder=""
                      autoFocus={true}
                      keyboardType="number-pad"
                      style={[
                        styles.fieldInput,
                        { borderBottomColor: disableBtn ? "transparent" : "#6AAE36" },
                      ]}
                    />
                  </View>
                  <View style={styles.signInRow}>

                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      //justifyContent: 'flex-start',
                      alignItems: "center",
                      marginBottom: 15
                    }}>
                      <CheckBox
                        onClick={() => {
                          onChangedPrivatePolicy()
                        }}
                        isChecked={toggleCheckBox}
                      />
                      <View
                        style={{
                          display: 'flex',
                          flex: 1,
                          marginLeft: 31,
                        }}
                      >
                        <HTMLView
                          addLineBreaks={false}
                          value={"<p>Я даю згоду на обробку своїх персональний даних і погоджуюся з  <a href='https://bestpresso.ua'>політикою конфіденційності</a></p>"}
                          stylesheet={htmlStyles}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => signInWithPhoneNumber(phoneNumber)}
                      disabled={disableBtn}
                    >
                      <LinearGradient
                        colors={disableBtn ? ["#ccc", "#ccc"] : ["#cd002a", "#cd0000"]}
                        style={styles.signIn}
                      >
                        <Text style={styles.textSign}>Отримати СМС</Text>
                        <MaterialIcons name="navigate-next" color="#fff" size={20} />
                      </LinearGradient>
                    </TouchableOpacity>
                  
                  
                  </View>
                </View>
              </Animatable.View>
            

          </View>

        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>

  );
};

export default SignInScreen;

const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '600',
    color: '#FF3366',
  },
  p: {
    marginBottom: 5,
    paddingBottom: 5,
    fontSize: 12
  }
})

const styles = StyleSheet.create({

  inner: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: "100%",
  },
  bgImage: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  header: {
    flex: 1,
    position: 'absolute',
    bottom: 400,
    width: '100%',
    height: window - 400,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 400,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderBottomRightRadius: 30,
    // borderBottomLeftRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 0,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#000",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 15
  },
  desc: {
    color: "grey",
    marginBottom: 20
  },
  fieldInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldInputPrefix: {
    fontSize: 20,
    marginRight: 20
  },
  fieldInput: {
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 2,
    paddingLeft: 20,
    flex: 4,
    fontSize: 20,
    marginRight: 10,
  },
  signInRow: {
    display: "flex",
    height: 100,
    justifyContent: "space-between",
    marginTop: 30,
     
  },
  signIn: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    alignSelf: "center",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },

});
