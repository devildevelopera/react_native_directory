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
            entry: undefined,
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
                    entry: responseJson,
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE"
                }}
            />
        );
    }

    getPhoneTitle = (type) => {
        let title = ''
        switch (type) {
            case 'homephone':
                title = 'Home Phone';
                break;
            case 'home fax':
                title = 'Home Fax';
                break;
            case 'cellphone':
                title = 'Cell Phone';
                break;
            case 'workphone':
                title = 'Work Phone';
                break;
            case 'workfax':
                title = 'Work Fax';
                break;
        }

        return title;
    }

    getAddressTitle = (type) => {
        const title = type.charAt(0).toUpperCase() + type.slice(1);

        return title;
    }

    render() {
        const { entry } = this.state;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator size="large" color="#2196f3" />
                </View>
            );
        }

        return (
            <View style={[styles.BaseView]}>
                {this.renderSeparator()}
                <View>
                    <Image
                        source={{ uri: entry.images.photo.large.url }}
                        style={{ height: imageHeight, width: imageWidth }}
                    />
                    <Text
                        style={styles.RowTitleContainer}
                    >
                        Organization
                    </Text>
                    <Text
                        style={styles.RowContainer}
                    >
                        {entry.fn.rendered}
                    </Text>
                    {entry.adr.length > 0 &&
                        <Text
                            style={styles.RowTitleContainer}
                        >
                            Address
                    </Text>
                    }
                    {entry.adr.map((item, index) => (
                        <Text
                            style={styles.RowContainer}
                            key={index}
                        >
                            {this.getAddressTitle(item.type)}: {item.street_address.rendered}, {item.county.rendered} {item.locality.rendered} {item.region.rendered} {item.postal_code.rendered}
                        </Text>
                    ))}
                    {entry.tel.length > 0 &&
                        <Text
                            style={styles.RowTitleContainer}
                        >
                            Phone
                    </Text>
                    }
                    {entry.tel.map((item, index) => (
                        <Text
                            style={styles.RowContainer}
                            key={index}
                        >
                            {this.getPhoneTitle(item.type)}: {item.number.rendered}
                        </Text>
                    ))}

                </View>
            </View>
        );
    }
}

export default ViewEntryPage;