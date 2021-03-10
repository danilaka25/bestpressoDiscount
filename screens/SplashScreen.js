import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

import LOGO from '../assets/svg/logo.svg';
import bgImage from "../assets/pattern2.jpg";

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode='repeat' style={styles.bgImage}>


                <Animatable.View
                    style={styles.header}
                    animation="bounceIn"
                    duraton="3500"
                >
                    <LOGO width="290" height="100" />
                </Animatable.View>

                <Animatable.View
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                    animation="fadeInUpBig"
                >
                    <Text style={[styles.title, {
                        color: colors.text
                    }]}>Накапливай баллы, получай скидуи!</Text>
                    <Text style={styles.text}>Desc of discount app</Text>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <LinearGradient
                                colors={['#cd002a', '#cd0000']}
                                style={styles.signIn}
                            >
                                <Text style={styles.textSign}>Начать</Text>
                                <MaterialIcons
                                    name="navigate-next"
                                    color="#fff"
                                    size={20}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ImageBackground>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.38;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bgImage: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        shadowColor: '#999',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

