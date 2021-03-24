import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import bgImage from "../assets/pattern2.jpg";
import LOGO from "../assets/svg/logo.svg";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from "../styles/confirmStyles";

import { connect } from 'react-redux';
import { signIn } from './../redux/actions/authActions';

const ConfirmScreen = (props) => {

  //console.log("route ConfirmScreen", props.signIn)

  const confirm = props.route.params.confirm;
  const phoneNumber = props.route.params.phoneNumber;

  const { Value, Text: AnimatedText } = Animated;
  const CELL_COUNT = 6;
  const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
  const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
  const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        useNativeDriver: false,
        toValue: isFocused ? 1 : 0,
        duration: 250,
      }),
      Animated.spring(animationsScale[index], {
        useNativeDriver: false,
        toValue: hasValue ? 0 : 1,
        duration: hasValue ? 300 : 250,
      }),
    ]).start();
  };

  const renderConfirmCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const [disableBtn, setDisableBtn] = useState(true);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props2, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const fieldChanged = (value) => {
    setValue(value);

    if (value.length == 6) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  async function confirmCode() {
    let prefix = "+38";
    try {
      await confirm.confirm(value);

      try {
        await AsyncStorage.setItem("fireBaseToken", confirm._verificationId);
        await AsyncStorage.setItem("phoneNumber", prefix + phoneNumber);
        props.signIn(confirm._verificationId)// dispatch
      } catch (e) {
        //console.log(e);
      }
    } catch (error) {
      Alert.alert("false code");
    }
  }

  return (

    <ImageBackground
      source={bgImage}
      resizeMode="repeat"
      style={styles.bgImage}
    >
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={
          Platform.select({
            ios: () => 0,
            android: () => -80
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
              <LOGO width="280" height="100" />
            </Animatable.View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig">
              <Text style={styles.title}>Ведіть код з СМС</Text>

              <CodeField
                ref={ref}
                {...props2}
                value={value}
                onChangeText={(value) => fieldChanged(value)}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderConfirmCell}
                autoFocus={true}
              />

              <View style={styles.signInRow}>
                <TouchableOpacity
                  disabled={disableBtn}
                  onPress={() => confirmCode()}
                >
                  <LinearGradient
                    colors={disableBtn ? ["#ccc", "#ccc"] : ["#cd002a", "#cd0000"]}
                    style={styles.signIn}
                  >
                    <Text style={styles.textSign}>НАДІСЛАТИ</Text>
                    <MaterialIcons name="navigate-next" color="#fff" size={20} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>


          </View>
        </SafeAreaView>

      </KeyboardAvoidingView>
    </ImageBackground>

  );
};


const mapStateToProps = state => {
  return {
    reducerData: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (fireBaseToken) => dispatch(signIn(fireBaseToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen);