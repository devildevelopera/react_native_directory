import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, Dimensions } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

class ViewEntryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entryId: 0,
            item: undefined,
            isLoading: true
        }
    }

    static navigationOptions = {
        title: 'Entry Detail',
    };

    componentDidMount() {
        this.setState({
            entryId: this.props.navigation.state.params.entryId
        });
        this.LoadEntry();
    }

    LoadEntry = () => {
        let url = baseUrl + '/entry/' + this.props.navigation.state.params.entryId;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    item: responseJson,
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={[styles.BaseView]}>
                <View
                    style={{
                        height: 1,
                        backgroundColor: "#CED0CE"
                    }}
                />
                <View>
                    <Image
                        source={{ uri: this.state.item.images.photo.large.url }}
                        style={{ height: imageHeight, width: imageWidth }}
                    />
                    <Text
                        style={styles.RowContainer}
                    >
                        {this.state.item.fn.rendered}
                    </Text>
                    <Text
                        style={styles.RowContainer}
                    >
                        {this.state.item.adr[0].street_address.rendered}
                    </Text>
                    <Text
                        style={styles.RowContainer}
                    >
                        {this.state.item.adr[0].county.rendered} {this.state.item.adr[0].locality.rendered} {this.state.item.adr[0].region.rendered} {this.state.item.adr[0].postal_code.rendered}
                    </Text>
                </View>
            </View>
        );
    }
}

export default ViewEntryPage;