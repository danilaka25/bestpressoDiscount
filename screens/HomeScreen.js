import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

import Barcode from "react-native-barcode-builder";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-community/async-storage";
import Header from "../components/Header";
import database from "@react-native-firebase/database";

import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import Svg, { Rect } from "react-native-svg";

import bgImage from "../assets/pattern2.jpg";
import STAR from "../assets/svg/star.svg";
import INFO from "../assets/svg/info.svg";
import SETTINGS from "../assets/svg/settings.svg";
import MAP from "../assets/svg/map.svg";
import MENU from "../assets/svg/menu.svg";
import CUP from "../assets/svg/coffee-cup.svg";
import NEWS from "../assets/svg/newspaper.svg";
import CUP_Active from "../assets/svg/coffee-cup-active.svg";
import NEWS_Active from "../assets/svg/newspaper-active.svg";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchIikoPending, fetchIikoSuccess, fetchIikoError } from './../redux/actions/userDataActions';
import { fetchUserData } from './../redux/actions/fetchUserData';

import {
  IIKO_LOGIN,
  IIKO_PASS,
  IIKO_ORGANIZATION_ID,
} from "react-native-dotenv";


const windowHeight = Dimensions.get('window').height;
let smallScreen = false
if (windowHeight <= 550) {
  smallScreen = true
}

const HomeScreen = (props) => {


  console.log("HomeScreen pending" , fetchIikoSuccess())

  //const isFetchingIiko = props.userDataReducer.pending

  const productCarousel = useRef();
  const newsCarousel = useRef();



  console.log("props", props.updateUserData)

  const [firebaseToken, setFirebaseToken] = useState();
  const [phone, setPhone] = useState(null);
  const [iikoToken, setIikoToken] = useState(null);

  const [balance, setBalance] = useState(999);

  const [activeNewsIndex, setNewsActiveIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const [news, setNews] = useState([]);
  const [products, setProducts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [initalRegion, setInitalRegion] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);


  const substrNewsTitle = (title) => {

    let length = 62
    let tempTitle = title.substr(0, length)
    let tempDots = ' ... '

    if (title.length >= length) {
      return tempTitle + tempDots
    } else {
      return title
    }

  }

  const _renderNews = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginLeft: 25, marginRight: 25 }}
        activeOpacity={1}
        itemData={item}
        onPress={() =>
          props.navigation.navigate("NewsItemDetails", { itemData: item }, props.navigation)
        }
      >
        <View style={styles.NewsItemBlock}>
          <Image style={styles.NewsItemImage} source={{ uri: item.img }} />
          <Text style={styles.NewsItemTitle}>{substrNewsTitle(item.title)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderProducts = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginLeft: 25 }}
        activeOpacity={1}
        itemData={item}
        onPress={() =>
          props.navigation.navigate(
            "ProductItemDetails",
            { itemData: item },
            props.navigation
          )
        }
      >
        <View style={styles.ProductItemBlock}>
          <View style={{ height: 20 }}></View>
          <View style={styles.ProductItemWrapper}>
            <Image style={styles.ProductItemImage} source={{ uri: item.img }} />
            <View style={styles.ProductItemTitleBlock}><Text style={styles.ProductItemTitle}>{item.title}</Text></View>
            <Text style={styles.ProductItemPrice}>
              {item.variations[0].price} ₴
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getAllDataFromFirebaseDb = async () => {
    console.log("isLoading");
    let tempNews = [];
    let tempProducts = [];
    let tempPlaces = [];
    let tempInitalRegion = [];
    await database()
      .ref("/")
      .once("value")
      .then((snapshot) => {
        for (var key in snapshot.val().news) {
          tempNews.push(snapshot.val().news[key]);
        }
        for (var key in snapshot.val().products) {
          tempProducts.push(snapshot.val().products[key]);
        }
        for (var key in snapshot.val().places) {
          tempPlaces.push(snapshot.val().places[key]);
        }
        for (var key in snapshot.val().initalRegion) {
          tempInitalRegion.push(snapshot.val().initalRegion[key]);
        }
        setNews(tempNews);
        setProducts(tempProducts);
        setPlaces(tempPlaces);
        setInitalRegion(tempInitalRegion);
      });
  };

  useEffect(() => {
    (async () => {
      await getAllDataFromFirebaseDb();
      await setLoading(false);
    })();

    getPhoneAndIikoToken().then((data) => {


      //getIikoUserInfoByPhone(data[0], data[1]);
      props.fetchUserData()



      console.log("userDataReducer((((", props.userDataReducer.iikoUserData.walletBalances[0].balance)


      //setBalance(props.userDataReducer.iikoUserData.walletBalances[0].balance)
      // setTimeout(() => 
      // getIikoUserInfoByPhone(data[0], data[1])

      // , 6000);

    });

    // console.log("userDataReducer", props.userDataReducer);


  }, []);

  const getPhoneAndIikoToken = async () => {
    let phoneNumber;
    let iikoToken;
    try {
      phoneNumber = await AsyncStorage.getItem("phoneNumber");
      iikoToken = await getIikoAuthToken();
    } catch (e) {
      //console.log(e)
    }
    setPhone(phoneNumber);
    return [phoneNumber, iikoToken];
  };

  const addIikoUserByPhone = (phone, token) => {
    console.log("post user START");
    fetch(
      "https://card.iiko.co.uk/api/0/customers/create_or_update?access_token=" +
      token +
      "&organization=" +
      IIKO_ORGANIZATION_ID,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: { phone: phone, magnetCardTrack: generateCardNumber(phone) },
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("post user", response);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const generateCardNumber = (phoneNumber) => {
    let phone = phoneNumber; // 10
    phone = phone.split('+38').join('');
    let arr = [];
    for (let char of phone) {
      arr.push(char);
    }
    let cardNumber = "0000" + arr[0] + arr[3] + arr[1] + arr[8] + arr[9] + arr[2] + arr[4] + arr[7] + arr[6] + arr[5]

    //console.log("arr", cardNumber)
    return cardNumber
  }

  const getIikoAuthToken = () => {
    return fetch(
      "https://card.iiko.co.uk/api/0/auth/access_token?user_id=" +
      IIKO_LOGIN +
      "&user_secret=" +
      IIKO_PASS,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((iikoToken) => {
        return iikoToken;
      })
      .catch((err) => { });
  };

  const getIikoUserInfoByPhone = (phone, token) => {
    return fetch(
      "https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=" +
      token +
      "&organization=" +
      IIKO_ORGANIZATION_ID +
      "&phone=" +
      phone,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((userData) => {


        console.log("---userData---", userData)

        props.updateUserData(userData)



        //console.log("getIikoUserInfoByPhone userData", userData);
        if (userData.httpStatusCode == 400 && userData.code == null) {
          // create new user
          console.log("addIikoUserByPhone start");


          addIikoUserByPhone(phone, token)
          //setBalance(0);

        } else {
          // set balance
          console.log("set balance");
          //setBalance(userData.walletBalances[0].balance);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkIfIikoTokenIsValid = (iikoToken) => {
    return fetch(
      "https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=" +
      iikoToken,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //setIikoResponseCode(responseJson.code)
        console.log("checkIfIikoTokenIsValid");

        if (responseJson.code == 201) {
          return false;
        } else {
          return true;
        }

        //return responseJson.code
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeTab = (n) => {
    setActiveTab(n);
  };

  const renderSlider = (activeTab) => {
    return (
      <>
        {activeTab ? (
          <View style={styles.SliderWrapper}>
            <Carousel
              ref={newsCarousel}
              layout={"default"}
              loop={true}
              enableSnap={true}
              activeSlideAlignment={"start"}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              data={news}
              sliderWidth={210}
              itemWidth={280}
              renderItem={_renderNews}
              onSnapToItem={(index) => setNewsActiveIndex(index)}
            />

          </View>
        ) : (
            <View style={styles.SliderWrapper}>
              <Carousel
                ref={productCarousel}
                layout={"default"}
                loop={false}
                //enableSnap={true}
                activeSlideAlignment={"start"}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                data={products}
                sliderWidth={150}
                itemWidth={160}
                renderItem={_renderProducts}
                onSnapToItem={(index) => setActiveProductIndex(index)}
              />
            </View>
          )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode="repeat"
        style={styles.bgImage}
      >
        <View style={styles.logoContainer}>
          <Header navigation={props.navigation} showBack={false} showReload={true} showInfo={false} />
        </View>
        <View style={styles.barcodeContainer}>
          <View style={styles.barcodeInner}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("DiscountBigScreen", props.navigation)}
            >
              <View>
                {phone == null ? (
                  <Text>No bonus</Text>
                ) : (
                    <Barcode
                      value={generateCardNumber(phone)}
                      format="CODE128"
                      background="#fff"
                      lineColor="#000"
                    // width="3"
                    />
                  )}
              </View>
            </TouchableOpacity>
            <View style={styles.barcodeDescRow}>
              <Text style={styles.barcodeDesc}>На Вашому рахунку:</Text>
              <View style={styles.barcodePointsContainer}>
                <STAR width={27} height={27} />
                {/* {props.userDataReducer.pending ? <Text>Loading</Text> : <Text style={styles.barcodePointsValue}>{props.userDataReducer.iikoUserData.walletBalances[0].balance}</Text>} */}
                <Text style={styles.barcodePointsText}>Балів</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity //style={styles.toggleBtn}
            activeOpacity={1}
            style={[
              styles.toggleBtn,
              { borderColor: activeTab == 0 ? "#6AAE36" : "transparent" },
            ]}
            onPress={() => changeTab(0)}
          >
            {activeTab == 1 ? <CUP width="40" height="40" /> : <CUP_Active />}



            {smallScreen ? <></> : <Text
              style={[
                styles.toggleBtnTxt,
                { color: activeTab == 0 ? "#6AAE36" : "#000" },
              ]}
            >
              Меню
            </Text>}

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.toggleBtn,
              { borderColor: activeTab == 1 ? "#6AAE36" : "transparent" },
            ]}
            onPress={() => changeTab(1)}
          >
            {activeTab == 1 ? <NEWS_Active /> : <NEWS />}
          


            {smallScreen ? <></> : <Text
              style={[
                styles.toggleBtnTxt,
                { color: activeTab == 0 ? "#6AAE36" : "#000" },
              ]}
            >
              Новости
            </Text>}


          </TouchableOpacity>
        </View>

        {!loading ? (
          renderSlider(activeTab)
        ) : (
            <ScrollView horizontal={true} style={styles.preloadProductsRow}>
              <SvgAnimatedLinearGradient
                width={140}
                height={160}
                style={styles.preloadProductItem}
              >
                <Rect x="0" y="0" rx="5" ry="0" width="140" height="160" />
              </SvgAnimatedLinearGradient>
              <SvgAnimatedLinearGradient
                width={140}
                height={160}
                style={styles.preloadProductItem}
              >
                <Rect x="0" y="0" rx="5" ry="0" width="140" height="160" />
              </SvgAnimatedLinearGradient>
              <SvgAnimatedLinearGradient
                width={140}
                height={160}
                style={styles.preloadProductItem}
              >
                <Rect x="0" y="0" rx="5" ry="0" width="140" height="160" />
              </SvgAnimatedLinearGradient>
            </ScrollView>
          )}

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => props.navigation.navigate("SettingsScreen")}
          >
            <View style={styles.categoryIcon}>
              <SETTINGS width={26} height={26} />
            </View>
            <Text style={styles.categoryBtnTxt}>Налаштування</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => props.navigation.navigate("EditProfileScreen")}
          >
            <View style={styles.categoryIcon}>
              <SETTINGS width={26} height={26} />
            </View>
            <Text style={styles.categoryBtnTxt}>Edit</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => props.navigation.navigate("DiscountDescription")}
          >
            <View style={styles.categoryIcon}>
              <MENU width={26} height={26} />
            </View>
            <Text style={styles.categoryBtnTxt}>Меню</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              props.navigation.navigate(
                "ExploreScreen",
                { places, initalRegion },
                props.avigation
              )
            }
          >
            <View style={styles.categoryIcon}>
              <MAP width={26} height={26} />
            </View>
            <Text style={styles.categoryBtnTxt}>Заклади</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View >
  );
};




//export default HomeScreen;

const mapStateToProps = state => {
  return {
    userDataReducer: state.userDataReducer,
  };
};


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchUserData }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },
  scrollArea: {
    width: "100%",
    marginBottom: 80,
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    height: 70,
  },
  barcodeContainer: {
    marginTop: 0,
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeInner: {
    width: "90%",
    borderRadius: 15,
    padding: 5,
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  barcodeDescRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barcodeDesc: {
    fontSize: 15,
    color: "#6AAE36",
  },
  barcodePointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodePointsValue: {
    fontSize: 29,
    color: "#6AAE36",
    marginLeft: 10,
    marginRight: 10,
  },
  barcodePointsText: {
    fontSize: 10,
  },
  toggleRow: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "center",
  },
  toggleBtn: {
    padding: 40,
    borderRadius: 15,
    backgroundColor: "#fff",
    width: "48%",
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  toggleBtnTxt: {
    marginTop: 10,
  },
  categoryContainer: {
    position: "absolute",
    bottom: 0,
    borderRadius: 15,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  categoryBtnTxt: {
    fontSize: 12,
    alignSelf: "center",
    marginTop: 5,
    color: "#000",
  },
  SliderWrapper: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    //width: "95%",
    alignSelf: "flex-end",
  },
  NewsItemBlock: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 270,
    height: 120,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  NewsItemImage: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  NewsItemTitle: {
    width: 140,
    height: 120,
    fontSize: 14,
    padding: 10,
  },
  NewsItemDesc: {},
  productItem: {
    width: 160,
    padding: 5,
    marginRight: 15,
  },
  productItemWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 120,
    height: 90,
    borderRadius: 15,
    marginTop: -20,
    zIndex: 10,
  },

  ProductItemBlock: {
    width: 160,
    padding: 5,
    marginRight: 15,
  },
  ProductItemWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ProductItemImage: {
    width: 120,
    height: 90,
    borderRadius: 15,
    marginTop: -20,
    zIndex: 10,
  },
  ProductItemTitleBlock: {
    width: 118,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ProductItemTitle: {
    textAlign: 'center'
  },
  ProductItemPrice: {
    position: "absolute",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 10,
    zIndex: 30,
    right: 30,
    top: -10,
    padding: 5,
    borderRadius: 5,
  },
  preloadProductsRow: {
    flex: 2,

    marginLeft: "5%",
  },
  preloadProductItem: {
    // width: 160,
    // height: 160,
    // backgroundColor: '#ccc',
    marginRight: 5,
    borderRadius: 15,
    marginLeft: 0,
  },
});
