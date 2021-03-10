import { StyleSheet, Platform, Dimensions } from "react-native";
export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#ccc";
export const NOT_EMPTY_CELL_BG_COLOR = "#6AAE36";
export const ACTIVE_CELL_BG_COLOR = "#6AAE31";
const { height, width } = Dimensions.get("screen");
const height_logo = height * 0.38;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    width: width,
    height: height,
  },
  header: {
    height: '50%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    top: 0
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
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
