import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Barcode from "react-native-barcode-builder";

import * as Animatable from "react-native-animatable";

import STAR from "../assets/svg/star.svg";

import bgImage from "../assets/pattern2.jpg";

import Header from "../components/Header";

const DiscountBigScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar hidden />
      <Header navigation={navigation} showBack={true} showReload={true} />
      <SafeAreaView style={styles.backgroung}>
        <ImageBackground
          source={bgImage}
          resizeMode="repeat"
          style={styles.bgImage}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <View style={styles.bonusWrapper}>
              <Text style={styles.bonusWrapperTitle}>на вашеи счету</Text>
              <Text>0</Text>
              <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
              >
                <STAR width={27} height={27} />
              </Animatable.View>
            </View>

            <View
              style={[
                styles.barcodeWrapper,
                {
                  transform: [{ rotate: "90deg" }],
                },
              ]}
            >
              <Barcode
                value="+380632373202"
                format="CODE128"
                background="#fff"
                lineColor="#000"
                width="3"
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default DiscountBigScreen;

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
  },
  backgroung: {
    backgroundColor: "#000",
  },
  bonusWrapper: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#ccc",
    height: 60,
    width: 280,
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    marginBottom: 150,
  },
  bonusWrapperTitle: {},
  barcodeWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: 200,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
});
