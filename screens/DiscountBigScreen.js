import React, { useContext } from "react";
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
import { ThemeContext } from './../components/context';


const DiscountBigScreen = (props) => {

  const smallScreen = useContext(ThemeContext);
  const phone = props.userDataReducer.iikoUserData.phone
  const balance = props.userDataReducer.iikoUserData.walletBalances[0].balance
  const cardNumber = props.userDataReducer.iikoUserData.cards[0].Number

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
                value={cardNumber}
                format="CODE128"
                background="#fff"
                lineColor="#000"
                width="3"
              />
              <View style={styles.bonusWrapperBonus}>
                <Text>На вашому рахунку</Text>
                <Text style={styles.bounusWrapperValue}>{balance}</Text>
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                >
                  <STAR width={27} height={27} />
                </Animatable.View>
              </View>
            </View>
          </View>

          <View style={[styles.bonusWrapper, {
            bottom: smallScreen ? 0 : 20
          }]}
          >
            <TouchableOpacity
              style={styles.bonusWrapperButton}
              onPress={() =>
                props.navigation.navigate(
                  "DiscountDescription",
                  props.navigation
                )
              }
            >
              <Text style={styles.bonusWrapperTitle}>Як нараховуються бали?</Text>
              <INFO />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

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

    alignItems: "center",
    justifyContent: 'center',
  },
  bonusWrapperRow: {
    width: '100%',
    height: 45,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 35,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bonusWrapperButton: {
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 15
  },
  bonusWrapperTitle: {
    marginRight: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  bounusWrapperValue: {
    marginHorizontal: 10
  },
  barcodeWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    //height: 200,
    //paddingHorizontal: 30,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    //marginTop: -20
  },
  bonusWrapperBonus: {
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row'
  },
});
