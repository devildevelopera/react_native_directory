import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from '../styles/Styles';

class LandingPage extends React.Component {

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={styles.landingContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logoStyle} />
                <View style={styles.leadButtonsStyle}>
                    <TouchableOpacity
                        style={styles.TouchableOpacityStyle}
                        onPress={() => this.props.navigation.navigate('Category')}>
                        <Text style={styles.TextStyle}>View Directory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TouchableOpacityStyle}
                        onPress={() => this.props.navigation.navigate('AddEntry')}>
                        <Text style={styles.TextStyle}> Add New Entry </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LandingPage;