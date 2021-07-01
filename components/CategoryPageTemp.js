import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from '../styles/Styles';
class CategoryPage extends React.Component {

    render() {
        return (
            <View style={styles.landingContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logoStyle} />
                <View style={styles.leadButtonsStyle}>
                    <TouchableOpacity
                        style={styles.TouchableOpacityStyle}
                        onPress={() => this.props.navigation.navigate('ViewCategory')}>
                        <Text style={styles.TextStyle}>View Category</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default CategoryPage;