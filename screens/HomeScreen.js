import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Barcode from "react-native-barcode-builder";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-community/async-storage";
import Header from "../components/Header";
import database from "@react-native-firebase/database";


import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, { Rect } from 'react-native-svg'

import bgImage from "../assets/pattern2.jpg";
import LOGO from "../assets/svg/logo.svg";
import STAR from "../assets/svg/star.svg";
import INFO from "../assets/svg/star.svg";
import SETTINGS from "../assets/svg/settings.svg";
import MAP from "../assets/svg/map.svg";
import MENU from "../assets/svg/menu.svg";
import CUP from "../assets/svg/coffee-cup.svg";
import NEWS from "../assets/svg/newspaper.svg";
import CUP_Active from "../assets/svg/coffee-cup-active.svg";
import NEWS_Active from "../assets/svg/newspaper-active.svg";

const HomeScreen = ({ navigation }) => {
  const [testToken, setTestToken] = useState(0);
  const [activeNewsIndex, setNewsActiveIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [news, setNews] = useState([]);
  const [products, setProducts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [initalRegion, setInitalRegion] = useState([]);
  const [activeTab, setActiveTab] = useState(0);



  

  const [loading, setLoading] = useState(true);





  const _renderNews = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        itemData={item}
        onPress={() =>
          navigation.navigate("NewsItemDetails", { itemData: item }, navigation)
        }
      >
        <View style={styles.NewsItemBlock}>
          <Image style={styles.NewsItemImage} source={{ uri: item.img }} />
          <Text style={styles.NewsItemTitle}>{item.title}</Text>
          <Text style={styles.NewsItemDesc}>{item.desc}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderProducts = ({ item }) => {
    return (
      
      <TouchableOpacity
        activeOpacity={1}
        itemData={item}
        onPress={() =>
          navigation.navigate(
            "ProductItemDetails",
            { itemData: item },
            navigation
          )
        }
      >
        <View style={styles.ProductItemBlock}>
          <View style={{ height: 20 }}></View>
          <View style={styles.ProductItemWrapper}>
            <Image style={styles.ProductItemImage} source={{ uri: item.img }} />
            <Text style={styles.ProductItemTitle}>{item.title}</Text>
            <Text style={styles.ProductItemPrice}>
              {item.variations[0].price} ₴
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getAllDataFromFirebaseDb = async () => {
    console.log('isLoading')
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
          //console.log(snapshot.val().places[key]);
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

  const getTokenFromStorage = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      //console.log(e)
    }
    setTestToken(userToken);
  };

  useEffect(() => {
    getTokenFromStorage();
    
    (async () => {
      await getAllDataFromFirebaseDb();
      await setLoading(false)
      await console.log('loaded')

    })();
   
   
   
    console.log("useEffect");


  }, []);

  const changeTab = (n) => {
    setActiveTab(n);
  };

  const renderSlider = (activeTab) => {
    return(
      <>
    {activeTab ? (
      <View style={styles.SliderWrapper}>
        <Carousel
          layout={"default"}
          loop={true}
          enableSnap={true}
          activeSlideAlignment={"start"}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={news}
          sliderWidth={200}
          itemWidth={220}
          renderItem={_renderNews}
          onSnapToItem={(index) => setNewsActiveIndex(index)}
        />
      </View>
    ) : (
      <View style={styles.SliderWrapper}>
        <Carousel
          layout={"default"}
          loop={true}
          enableSnap={true}
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
    </>)
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={bgImage}
        resizeMode="repeat"
        style={styles.bgImage}
      >
        <View style={styles.logoContainer}>
          <Header navigation={navigation} showBack={false} showReload={false} />
        </View>
        <View style={styles.barcodeContainer}>
          <View style={styles.barcodeInner}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DiscountBigScreen")}
            >
              <View>
                <Barcode
                  value="+380632373201"
                  format="CODE128"
                  background="#fff"
                  lineColor="#000"
                />
              </View>
            </TouchableOpacity>
            <View style={styles.barcodeDescRow}>
              <Text style={styles.barcodeDesc}>На Вашому рахунку:</Text>
              <View style={styles.barcodePointsContainer}>
                <STAR width={27} height={27} />
                <Text style={styles.barcodePointsValue}>15</Text>
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
            <Text
              style={[
                styles.toggleBtnTxt,
                { color: activeTab == 0 ? "#6AAE36" : "#000" },
              ]}
            >
              Меню
            </Text>
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
            <Text
              style={[
                styles.toggleBtnTxt,
                { color: activeTab == 0 ? "#6AAE36" : "#000" },
              ]}
            >
              Новости
            </Text>
          </TouchableOpacity>
        </View>   


        {!loading ? (
           renderSlider(activeTab)

        ) : (
          <ScrollView
          horizontal={true}
          style={styles.preloadProductsRow}
        >
          <SvgAnimatedLinearGradient width={140} height={160}  style={styles.preloadProductItem}>
              <Rect x="0" y="0" rx="5" ry="0" width="140" height="160"/>
          </SvgAnimatedLinearGradient>
          <SvgAnimatedLinearGradient width={140} height={160} style={styles.preloadProductItem}>
              <Rect x="0" y="0" rx="5" ry="0" width="140" height="160"/>
          </SvgAnimatedLinearGradient>
          <SvgAnimatedLinearGradient width={140} height={160}  style={styles.preloadProductItem}>
              <Rect x="0" y="0" rx="5" ry="0" width="140" height="160"/>
          </SvgAnimatedLinearGradient>
        
        </ScrollView>
        )}

      



        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <View style={styles.categoryIcon}>
              <SETTINGS width={26} height={26} />
            </View>
            <Text style={styles.categoryBtnTxt}>Налаштування</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("ExploreScreen")}
          >
            <View style={styles.categoryIcon}>
              <MAP width={26} height={26} />
            </View>
            <Text style={styles.categoryBtnTxt}>Заклади</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate(
                "ExploreScreen",
                { places, initalRegion },
                navigation
              )
            }
          >
            <View style={styles.categoryIcon}>
              <MENU width={26} height={26} />
            </View>
            <Text style={styles.categoryBtnTxt}>Меню</Text>
          </TouchableOpacity>
        </View>

        
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

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
    width: "95%",
    alignSelf: "flex-end",
  },
  NewsItemBlock: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 200,
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
    width: 139,
    height: 83,
    borderRadius: 5,
  },
  NewsItemTitle: {
    fontSize: 12,
    width: "50%",
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
  ProductItemTitle: {
    width: 118,
    height: 55,
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
   
    marginLeft: '5%'
    
    
  },
  preloadProductItem: {
    // width: 160,
    // height: 160,
    // backgroundColor: '#ccc',
    marginRight: 5,
    borderRadius: 15,
    marginLeft: 0
  }
});
