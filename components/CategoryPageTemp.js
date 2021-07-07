import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, ActivityIndicator, Image, TouchableOpacity, Text } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            data: [],
            pageSize: 18,
            loading: true,
            activeCat: 0
        };
    }

    static navigationOptions = {
        title: 'All Categories',
        headerLeft: () => null,
    };

    componentDidMount() {
        this.LoadCategories();
    }

    LoadCategories = () => {
        let tempPage = this.state.page + 1;
        let url = baseUrl + '/category/?page=' + tempPage.toString() + '&per_page' + this.state.pageSize.toString();
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length === 0 || responseJson.length === this.state.data.length) {
                    this.setState({
                        loading: false,
                    });
                }

                if (responseJson.length > 0) {
                    responseJson.map(item => {
                        item.value = item.id;
                        item.label = item.name.replace("&#039;", "'");
                    });

                    this.setState({
                        data: (this.state.page === 0) ? responseJson : [...this.state.data, ...responseJson],
                        page: this.state.page + 1
                    });

                    if (this.state.loading) {
                        this.LoadCategories();
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    GetViewCategory = () => {
        setTimeout(() => {
            this.setState({
                activeCat: 0
            });
        }, 100)

        if (this.state.activeCat) {
            this.props.navigation.navigate('ViewCategory', {
                categoryId: this.state.activeCat
            });
        }
    }

    render() {
        return (
            <View style={styles.landingContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logoStyle} />
                <View style={styles.landingDropdown}>
                    {!this.state.loading ?
                        <>
                            <RNPickerSelect
                                value={this.state.activeCat}
                                placeholder={{ label: "Choose a Category", value: 0 }}
                                onValueChange={(categoryId) => this.setState({ activeCat: categoryId })}
                                style={{
                                    inputAndroid: { height: 40, color: "#000", textAlign: "center" }, inputIOS: { height: 40, color: "#000", textAlign: "center" }, placeholder: { color: '#000' }
                                }}
                                items={this.state.data}
                            />
                            {this.state.activeCat != 0 &&
                                <TouchableOpacity style={styles.viewButtonStyle} onPress={() => this.GetViewCategory()}>
                                    <Text style={styles.TextStyle}>View</Text>
                                </TouchableOpacity>
                            }
                        </> :
                        <View style={{ flex: 1, paddingTop: 20 }}>
                            <ActivityIndicator size="large" color="#2196f3" />
                        </View>
                    }

                </View>
            </View>
        );
    }
}

export default CategoryPage;