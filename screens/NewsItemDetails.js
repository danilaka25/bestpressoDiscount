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
  Animated
} from "react-native";

import HTMLView from "react-native-htmlview";
import Header from "../components/Header";

import bgImage from "../assets/pattern2.jpg";

const win = Dimensions.get("window");
const ratio = win.width / 300; //541 is actual image width

const NewsItemDetails = ({ route, navigation }) => {
  const itemData = route.params.itemData;

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 65);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 65],
    outputRange: [0, -65],
  });

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
            <Image
              source={{ uri: itemData.img }}
              style={styles.newsImage}
              resizeMode="cover"
            />

            <Text style={styles.title}>{itemData.title}</Text>
            <HTMLView
              addLineBreaks={false}
              value={itemData.desc}
              style={styles.sectionContent}
              stylesheet={htmlStyles}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NewsItemDetails;



const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '600',
    color: '#FF3366',
  },
  p: {
    marginBottom: 5,
    paddingBottom: 5,
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
  newsImage: {
    width: '100%',
    height: 250,
    marginBottom: 10,
    borderRadius: 15,
  },
  section: {
    flex: 1,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
    alignSelf: "center",
    marginTop: 100,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

  },
  title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 15,
    lineHeight: 29,
    paddingHorizontal: 15
  },
  name: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 28,
    color: "#ffffff",
    paddingHorizontal: 15
  },
});
