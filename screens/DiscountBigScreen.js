import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Barcode from "react-native-barcode-builder";
import * as Animatable from "react-native-animatable";
import STAR from "../assets/svg/star.svg";
import bgImage from "../assets/pattern2.jpg";
import Header from "../components/Header";

import {connect} from 'react-redux';
import {updateUserData} from './../redux/actions/userDataActions';

const DiscountBigScreen = (props) => {

  console.log("DiscountBigScreen", props)

  let {phone} = props.route.params
  let balance = props.userDataReducer.userData.walletBalances[0].balance

  return (
    <>
      <Header navigation={props.navigation} showBack={true} showReload={true} />
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
            <View
              style={[
                styles.barcodeWrapper,
                {
                  transform: [{ rotate: "90deg" }],
                },
              ]}
            >
              <Barcode
                value={phone}
                format="CODE128"
                background="#fff"
                lineColor="#000"
                width="3"
              />
            </View>
          </View>
          <View style={styles.bonusWrapper}>
            <Text style={styles.bonusWrapperTitle}>на вашеи счету</Text>
            <Text style={styles.bounusWrapperValue}>{balance}</Text>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
            >
              <STAR width={27} height={27} />
            </Animatable.View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

//export default DiscountBigScreen;


const mapStateToProps = state => {
  return {
    userDataReducer: state.userDataReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateUserData: (data) => dispatch(updateUserData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscountBigScreen);

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
  },
  backgroung: {
    backgroundColor: "#000",
  },
  bonusWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#ccc",
    height: 60,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  bonusWrapperTitle: {},
  bounusWrapperValue: {
    marginHorizontal: 20
  },
  barcodeWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: 200,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
});
