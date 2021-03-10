import React, {useRef} from 'react';
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
  ScrollView
} from 'react-native';
 


import HTMLView from 'react-native-htmlview';
import Header from '../components/Header';



import bgImage from "../assets/pattern2.jpg";





const win = Dimensions.get('window');
const ratio = win.width/300; //541 is actual image width
  

const NewsItemDetails = ({route, navigation}) => {
  const itemData = route.params.itemData;
 
  return (
<ImageBackground source={bgImage} resizeMode='repeat' style={styles.bgImage}> 
  
<Header navigation={navigation} showBack={true} showReload={false} />
   
 


  <SafeAreaView style={styles.scrollArea}>
  <ScrollView style={styles.scrollView}>


      
       
    
             
      
       
      


     <View style={styles.section}> 

       <Image source={{uri:itemData.img}} style={styles.newsImage}  resizeMode="contain"/>
       
       <Text style={styles.title}>{itemData.title}</Text>
       <HTMLView
          value={itemData.text}
          stylesheet={styles.sectionContent}
        />
            
    </View>


 

    
    </ScrollView>
    </SafeAreaView>
    
    </ImageBackground>
  );
};

export default NewsItemDetails;

const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  scrollArea: {
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
 

 
  newsImage: {
    width: 400,
    height: 400,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10

  },
  container: {
     
     
     
  },
  section: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#fff',
     
    //padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 50,
    alignSelf: 'center',
    marginTop: 10,

  },
  image: {
    width: "100%",
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    lineHeight: 29
  },
  name: {
    fontWeight: 'bold',
  },


  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 28,
    color: '#ffffff'
     
  },
    
 
});
