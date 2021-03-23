import { StyleSheet, Platform, Dimensions } from "react-native";
export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#ccc";
export const NOT_EMPTY_CELL_BG_COLOR = "#f6f8fa";
export const ACTIVE_CELL_BG_COLOR = "#f6f8fa";
const { height, width } = Dimensions.get("screen");


const screen = Dimensions.get('screen').height;
const window = Dimensions.get('window').height;


//const height_logo = height * 0.38;

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
    bottom: 300,
    width: '100%',
    height: window - 300,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 300,
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
    // width: height_logo,
    // height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 23,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },



  codeFieldRoot: {
    height: CELL_SIZE,
     
     
    justifyContent: "center",
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 20,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#000",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

 
  title: {
    paddingTop: 0,
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 30,
  },
  desc: {
    fontSize: 16,
    paddingBottom: 30,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
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

export default styles;
