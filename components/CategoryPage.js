import React from 'react';
import { View, FlatList, ActivityIndicator, Text, TextInput, Image, Dimensions } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';


export const Images = {
    'adult-education': require('../assets/adult-education.jpg'),
    'childcare': require('../assets/childcare.jpg'),
    'childrens-education': require('../assets/childrens-education.jpg'),
    'community-involvement-social-support': require('../assets/community-involvement-social-support.jpg'),
    'community-reentry-assistance': require('../assets/community-reentry-assistance.jpg'),
    'employment': require('../assets/employment.jpg'),
    'family-relations': require('../assets/family-relations.jpg'),
    'food': require('../assets/food.jpg'),
    'healthcare-coverage': require('../assets/healthcare-coverage.jpg'),
    'housing': require('../assets/housing.jpg'),
}

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;


class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filteredData: [],
            loading: true,
            keyword: '',
        };
    }

    static navigationOptions = {
        title: 'All Categories',
    };

    componentDidMount() {
        this.LoadCategories();
    }

    LoadCategories = () => {
        let url = baseUrl + '/category'
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
                    responseJson.map(item => {
                        item.imageSrc = `../assets/${item.slug}.jpg`;
                    })
                    const filteredJson = responseJson;
                    this.setState({
                        loading: false,
                        data: [...this.state.data, ...responseJson],
                        filteredData: [...this.state.data, ...filteredJson],
                    });
                } else {
                    this.setState({
                        loading: false,
                    });
                }
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

    GetViewCategory = (categoryId) => {
        this.props.navigation.navigate('ViewCategory', {
            categoryId: categoryId
        });
    }

    Search = () => {
        const filteredJson = this.state.data.filter((item) => item.name.toLowerCase().includes(this.state.keyword.toLowerCase()));
        this.setState({
            filteredData: filteredJson,
        });
    }

    renderHeader = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator size="large" color="#2196f3" />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.BaseView}>
                <TextInput
                    placeholder='Search Category'
                    onSubmitEditing={() => this.Search()}
                    onChangeText={
                        value => this.setState({
                            keyword: value
                        })
                    }
                    value={this.state.keyword}
                    style={styles.SearchBox}
                />
                {this.renderSeparator()}
                <FlatList
                    data={this.state.filteredData}
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                source={Images[`${item.slug}`]}
                                style={{ height: imageHeight, width: imageWidth }}
                            />
                            <Text
                                style={styles.RowContainer}
                                onPress={this.GetViewCategory.bind(
                                    this,
                                    item.id
                                )}
                            >
                                {item.name} ({item.count})
                        </Text>
                        </View>
                    )}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}

export default CategoryPage;