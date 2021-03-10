import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";

import HTMLView from "react-native-htmlview";

import Header from "../components/Header";

import bgImage from "../assets/pattern2.jpg";

const ProductItemDetails = ({ route, navigation }) => {

  const itemData = route.params.itemData;
  let countItems = itemData.variations.length;

  const renderPrices = () => {
    if (countItems == 1) {
      return (
        <View style={styles.priceRow}>
          <View style={styles.price_1}>
            <Text>{itemData.variations[0].price}</Text>
            <Text>{itemData.variations[0].productSize} {itemData.unit}</Text>
          </View>
        </View>
      );
    } else if (countItems == 2) {
      return (
        <View style={styles.priceRow}>
          <View style={styles.price_1}>
            <Text>{itemData.variations[0].price} </Text>
            <Text>{itemData.variations[0].productSize} {itemData.unit}</Text>
          </View>
          <View style={styles.price_2}>
            <Text>{itemData.variations[1].price} </Text>
            <Text>{itemData.variations[1].productSize} {itemData.unit}</Text>
          </View>
        </View>
      );
    } else if (countItems == 3) {
      return (
        <View style={styles.priceRow}>     
          <View style={styles.price_1}>
            <Text>{itemData.variations[0].price}</Text>
            <Text>{itemData.variations[0].productSize} {itemData.unit}</Text>
          </View>
          <View style={styles.price_2}>
            <Text>{itemData.variations[1].price}</Text>
            <Text>{itemData.variations[1].productSize} {itemData.unit}</Text>
          </View>
          <View style={styles.price_3}>
            <Text>{itemData.variations[2].price}</Text>
            <Text>{itemData.variations[2].productSize} {itemData.unit}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text>error</Text>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={bgImage}
      resizeMode="repeat"
      style={styles.bgImage}
    >
      <SafeAreaView style={styles.scrollArea}>
      <ScrollView style={styles.scrollView}>
      <Header navigation={navigation} showBack={true} showReload={false} />
          <View style={styles.productImageBg}>
            <Image source={{ uri: itemData.img }} style={styles.productImage} resizeMode="cover"/>
          </View>
          <View style={styles.section}>
          <Text style={styles.title}>{itemData.title}</Text>
            {renderPrices()}
            <HTMLView value={itemData.text} stylesheet={styles.title} />
            <Text style={styles.sectionContent}>{itemData.title}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProductItemDetails;

const styles = StyleSheet.create({
   
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20
  },

  price_1: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: 50,
    backgroundColor: "#ccc",
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  price_2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: 50,
    backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  price_3: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: 50,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    paddingBottom: 20,
    alignItems: "center",
  },
  scrollArea: {
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
  price: {
    color: "#000000",
    backgroundColor: "#ffffff",
    borderWidth: 3,
    alignSelf: "center",
    textAlign: "center",
    lineHeight: 30,
  },
  productImageBg: {
    marginTop: 70,
  },
  productImage: {
    width: '90%', 
    height: 160,
    overflow: 'visible',
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  section: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    padding: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 50,
    alignSelf: "center",
    marginTop: -20,
  },
  image: {
    height: 200,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  title: {
    fontSize: 40,
  },
  name: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 18,
    color: "#ffffff",
  },
});
