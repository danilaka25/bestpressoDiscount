import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import LOGO from "../assets/svg/logo.svg";
import BACK from "../assets/svg/back.svg";
import RELOAD from "../assets/svg/reload.svg";
import INFO from "../assets/svg/info.svg";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserData } from './../redux/actions/fetchUserData';
import { ThemeContext } from './../components/context';


const Header = (props, { navigation }) => {

  const smallScreen = useContext(ThemeContext);
  
  const updateBalance = () => {
    props.fetchUserData()
  };

  const displayReload = () => {
    if (props.showReload) {
      return (
        <TouchableOpacity style={styles.reload} onPress={() => updateBalance()}>
          <RELOAD />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  const displayBack = () => {
    if (props.showBack) {
      return (
        <TouchableOpacity
          style={styles.back}
          onPress={() => props.navigation.goBack()}
        >
          <BACK />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  const displayInfo = () => {
    if (props.showInfo) {
      return (
        <TouchableOpacity style={styles.info}
          onPress={() =>
            props.navigation.navigate(
              "DiscountDescription",
              props.navigation
            )
          }
        >
          <INFO />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  return (
    <View 
    
    style={[styles.header, {
      height: smallScreen ? 55 : 65
    }]}
    >
      {displayBack()}
      <LOGO width={smallScreen ? '170' : '220'} height="80" style={styles.logo} />
      {displayReload()}
      {displayInfo()}
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchUserData }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  header: {
    display: "flex",
    width: "100%",
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    zIndex: 99,
    flex: 1,
  },
  back: {
    position: "absolute",
    left: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  reload: {
    position: "absolute",
    right: 15,
  },
  info: {
    position: "absolute",
    right: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  }
});
