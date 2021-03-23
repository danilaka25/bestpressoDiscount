import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Barcode from "react-native-barcode-builder";
import * as Animatable from "react-native-animatable";
import STAR from "../assets/svg/star.svg";
import bgImage from "../assets/pattern2.jpg";
import Header from "../components/Header";
import INFO from "../assets/svg/info.svg";

import { connect } from 'react-redux';
import { updateUserData } from './../redux/actions/userDataActions';

const DiscountBigScreen = (props) => {

  //console.log("DiscountBigScreen", props)

  let phone = props.userDataReducer.iikoUserData.phone
  let balance = props.userDataReducer.iikoUserData.walletBalances[0].balance




  const generateCardNumber = (phoneNumber) => {
    let phone = phoneNumber; // 10
    phone = phone.split('+38').join('');
    let arr = [];
    for (let char of phone) {
      arr.push(char);
    }
    let cardNumber = arr[0] + arr[3] + arr[1] + arr[8] + arr[9] + arr[2] + arr[4] + arr[7] + arr[6] + arr[5]

    //console.log("arr", cardNumber)
    return cardNumber
  }







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
                value={generateCardNumber(phone)}
                format="CODE128"
                background="#fff"
                lineColor="#000"
                width="3"
              />
            </View>
          </View>
          <View style={styles.bonusWrapper}>
            
            <View style={styles.bonusWrapperRow}>
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


            <TouchableOpacity 
            style={styles.bonusWrapperRow}
            onPress={() =>
              props.navigation.navigate(
                "DiscountDescription",
                props.navigation
              )
            }
            >
              <Text style={styles.bonusWrapperTitle}>Як нараховуються бали</Text>  
          
              <INFO />
            </TouchableOpacity>

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
    flexDirection: 'column',
    width: '100%',
    bottom: 0,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#fff",
    height: 90,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 35,

  },
  bonusWrapperRow: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

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
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
