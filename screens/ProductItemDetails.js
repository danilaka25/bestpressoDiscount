import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
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


  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 65);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 65],
    outputRange: [0, -65],
  });

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
      
      <Animated.View
        style={[
          styles.headerFixed,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <Header navigation={navigation} showBack={true} showReload={false} />
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
           
            <Image source={{ uri: itemData.img }} style={styles.productImage} resizeMode="cover"/>
          
           <View style={styles.sectionContent}>
            <Text style={styles.title}>{itemData.title}</Text>
            {renderPrices()}
            <HTMLView 
              addLineBreaks={false}
              value={itemData.text} 
              stylesheet={htmlStyles}/>
            
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProductItemDetails;


const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '600',
    color: '#FF3366',
  },
  p: {
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 16
  }

})

const styles = StyleSheet.create({

  headerFixed: {
    elevation: 4,
    zIndex: 999,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute'
  },
   
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
    position: "absolute",
    width: "100%",
    height: "100%",
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

  productImage: {
    width: '100%',
    height: 290,
    marginBottom: 10,
    borderRadius: 15,
  },
  section: {
    flex: 1,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 85,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    height: 200,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  sectionContent: {
    paddingHorizontal: 15,
    paddingBottom: 0,
    fontSize: 18,
  },
  title: {
    display: 'flex',
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'stretch'
  },
  name: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
 
});
