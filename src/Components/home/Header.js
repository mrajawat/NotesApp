import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
Icon.loadFont()

const Header = () => {
    return (
        <View style={styles.Container}>
            <View style={styles.ImageContainer}>
                <Image
                    source={require('../../assets/images/images.jpg')}cd 
                    style={styles.ImageStyle}
                />
            </View>
            <View style={styles.HeaderContainer}>
                <Text style={styles.TextStyle}>Notes App</Text>
            </View>
            <View style={styles.IconContainer}>
                <TouchableOpacity onPress={() => console.log("this")}>
                    <Icon name="bars" size={height * 0.026} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    Container: {
        height: height * 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation: 5,
        backgroundColor: '#eee',
        marginBottom: 10,
    },
    ImageContainer: {
        width: height * 0.060,
        height: height * 0.060,
        borderRadius: height * 0.04,
        overflow: 'hidden',
        elevation: 5,
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
    },
    HeaderContainer: {
        
        marginEnd:20,
        
    },
    TextStyle: {
        fontSize: height * 0.02,
        fontWeight: '800',
        elevation: 5,
        color:"#000"
    },
    IconContainer: {
        elevation: 5,
    },
});
