import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";

import STAR from "../assets/svg/star.svg";

import bgImage from "../assets/pattern2.jpg";

import Header from "../components/Header";

import BACK from "../assets/svg/back.svg";

const DiscountDescription = ({ navigation }) => {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 65);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 65],
    outputRange: [0, -65],
  });

  return (
    <ImageBackground
      source={bgImage}
      resizeMode="repeat"
      style={styles.bgImage}
    >
      <Animated.View
        style={[
          styles.headerFixed,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
       

        <Header navigation={navigation} showBack={true} showReload={false} bgTransparent={true} />
      </Animated.View>
      <SafeAreaView style={styles.scrollArea}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
        >
          <View style={styles.section}>
            <Text style={styles.levelTitle}>Система снижок</Text>

            <View style={styles.bonusDescBlock}>
              <View style={styles.bonusTextRow}>
                <Text style={styles.bonusDescText}>
                  За кожну витрачену гривню{" "}
                </Text>
                <Text style={styles.bonusDescText}>Ви отримуєте 1 зірку</Text>
              </View>
              <View>
                <Animatable.View
                  animation="pulse"
                  easing="ease-in"
                  iterationCount="infinite"
                >
                  <STAR width={41} height={41} />
                </Animatable.View>
              </View>
            </View>

            <View style={styles.levelBlue}>
              <Text style={styles.levelWhiteTitle}>BLUE LEVEL</Text>
            </View>

            <View style={styles.whiteBg}>
              <Text style={styles.levelTitle}>0-499 зірок/місяц</Text>

              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок длинный текст длинный
                текст длинный текст длинный текст
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
            </View>

            <View style={styles.levelOrange}>
              <Text style={styles.levelWhiteTitle}>ORANGE LEVEL</Text>
            </View>

            <View style={styles.whiteBg}>
              <Text style={styles.levelTitle}>0-499 зірок/місяц</Text>

              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
            </View>

            <View style={styles.whiteBg}>
              <Text style={styles.levelTitle}>0-499 зірок/місяц</Text>

              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
            </View>

            <View style={styles.whiteBg}>
              <Text style={styles.levelTitle}>0-499 зірок/місяц</Text>

              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
              <Text style={styles.levelListItem}>
                Безкоштовний напій за кожні 340 зірок
              </Text>
            </View>
          </View>
        
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DiscountDescription;

const styles = StyleSheet.create({
  headerFixed: {
    elevation: 4,
    zIndex: 999999999999,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute'
  },
  scrollArea: {
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
  section: {
    flex: 1,
    width: "90%",
    alignItems: "center",

    marginBottom: 10,
    alignSelf: "center",
    marginTop: 90,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  backgroung: {
    backgroundColor: "#000",
  },
  title: {},
  mainDesc: {},
  levelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  levelBlue: {
    backgroundColor: "#278BFF",
    width: 160,
    borderRadius: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
  },
  levelOrange: {
    backgroundColor: "#FF9921",
    width: 160,
    borderRadius: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
  },
  levelWhiteTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  levelPrice: {},
  levelListItem: {
    marginBottom: 5,
  },

  whiteBg: {
    backgroundColor: "#fff",
    marginBottom: 30,
    borderRadius: 15,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "100%",
    elevation: 5,
  },

  bonusDescBlock: {
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
  },
  bonusTextRow: {},
  bonusDescText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bonusDescGreen: {},

  bonusDescIcon: {},
});
