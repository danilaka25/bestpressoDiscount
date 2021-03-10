import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Animated,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useTheme } from "react-native-paper";

import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-community/async-storage";

import bgImage from "../assets/pattern2.jpg";
import LOGO from "../assets/svg/logo.svg";

const { height } = Dimensions.get("screen");
const height_logo = height * 0.38;

const { Value, Text: AnimatedText } = Animated;

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [confirm, setConfirm] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [tokenWasReceived, setTokenWasReceived] = useState(false);


  const [disableBtn, setDisableBtn] = useState(true);

  const onChangedPhone = (text) => {
    let validPhone = "";
    let numbers = "0123456789";
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        validPhone = validPhone + text[i];

        if (validPhone.length == 10) {
          setDisableBtn(false);
        } else {
          setDisableBtn(true);
        }


      } else {
        Alert.alert("please enter numbers only");
      }
    }
    setPhoneNumber(validPhone);
  };

  async function signInWithPhoneNumber(phoneNumber) {
    let prefix = "+38";
    if (phoneNumber.length == 10) {
      const confirmation = await auth().signInWithPhoneNumber(
        prefix + phoneNumber
      );

      

      setTokenWasReceived(true);

      navigation.navigate("ConfirmScreen", { confirm: confirmation , phoneNumber: phoneNumber}, navigation);

      console.log(confirmation._verificationId);
    } else {
      Alert.alert("not correct number");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode="repeat"
        style={styles.bgImage}
      >
        <Animatable.View
          style={styles.header}
          animation="bounceIn"
          duraton="3500"
        >
          <LOGO width="290" height="100" />
        </Animatable.View>

        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
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
                autoFocus={false}
              />
            </View>

            <View style={styles.signInRow}>
              <TouchableOpacity
                onPress={() => signInWithPhoneNumber(phoneNumber)}
                disabled={disableBtn}
              >
                <LinearGradient
                  colors={ disableBtn ? ["#ccc", "#ccc"] : ["#cd002a", "#cd0000"]}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign}>Отримати СМС</Text>
                  <MaterialIcons name="navigate-next" color="#fff" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>

        {/* tokenWasReceived */}
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;

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
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
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
  button: {
    // marginTop: 30,
  },
  fieldInputRow: {
    flexDirection: "row",

    alignItems: "center",
  },
  fieldInputPrefix: {
    // flex: 1,
    fontSize: 20,
    marginRight: 20
  },
  fieldInput: {
    backgroundColor: "#f8f9fa",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    paddingLeft: 20,
    flex: 4,
    fontSize: 20,
    marginRight: 10,
  },
  signInRow: {
    display: "flex",
    justifyContent: "center",
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
