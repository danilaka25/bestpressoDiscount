import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { useTheme } from "react-native-paper";

import auth from "@react-native-firebase/auth";
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

const ConfirmScreen = ({route, navigation}) => {

  const confirm = route.params.confirm
  const phoneNumber = route.params.phoneNumber

  //console.log("confirm", confirm)


  const { Value, Text: AnimatedText } = Animated;
  const { colors } = useTheme();

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

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  async function confirmCode() {
    try {
      await confirm.confirm(value);

      try {
        await AsyncStorage.setItem("userToken", confirm._verificationId);
        await AsyncStorage.setItem("phoneNumber", phoneNumber);
        navigation.navigate("HomeScreen", { transition: "fade" });
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.log("Invalid code.", error);
      Alert.alert("false code");
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
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={(value) => setValue(value)}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderConfirmCell}
          />
          <TouchableOpacity onPress={() => confirmCode()}>
            <View style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Verify</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

export default ConfirmScreen;
