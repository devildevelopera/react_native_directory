import React from 'react';
import { View, FlatList, ActivityIndicator, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';
import { imageHeight, imageWidth } from '../helper/Dimension';

export const Images = {
    'adult-education': require('../assets/adult-education.jpg'),
    'childcare': require('../assets/childcare.jpg'),
    'childrens-education': require('../assets/childrens-education.jpg'),
    'community-involvement-social-support': require('../assets/community-involvement-social-support-new.jpg'),
    'community-reentry-assistance': require('../assets/community-reentry-assistance.jpg'),
    'employment': require('../assets/employment-new.jpg'),
    'family-relations': require('../assets/family-relations-new.jpg'),
    'food': require('../assets/food.jpg'),
    'healthcare-coverage': require('../assets/healthcare-coverage-new.jpg'),
    'housing': require('../assets/housing-new.jpg'),
    'income': require('../assets/income.jpg'),
    'legal': require('../assets/legal.jpg'),
    'lifeskills': require('../assets/lifeskills.jpg'),
    'mental-health': require('../assets/mental-health.jpg'),
    'mobility': require('../assets/mobility.jpg'),
    'other': require('../assets/other.jpg'),
    'parenting-skills': require('../assets/parenting-skills.jpg'),
    'safety': require('../assets/safety.jpg'),
    'uncategorized': require('../assets/uncategorized.jpg'),
}

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true,
            refreshing: false,
            loadMore: false,
            page: 0,
            pageSize: 10,
            keyword: '',
            shouldRefresh: false
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
                if (responseJson.length > 0) {
                    responseJson.map(item => {
                        item.imageSrc = `../assets/${item.slug}.jpg`;
                    })
                    this.setState({
                        loading: false,
                        loadMore: false,
                        refreshing: false,
                        data: (this.state.page === 0) ? responseJson : [...this.state.data, ...responseJson],
                        page: this.state.page + 1
                    });
                } else {
                    this.setState({
                        loading: false,
                        loadMore: false,
                        refreshing: false
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    Refresh = () => {
        this.setState({
            page: 0,
            data: [],
            refreshing: false,
            loading: true,
            keyword: ''
        }, () => {
            this.LoadCategories();
        });
    }

    LoadMore = () => {
        if (this.state.loading || this.state.loadMore) return null;

        if (this.state.data.length < this.state.pageSize) return null;

        this.setState({
            loadMore: true
        }, () => {
            this.LoadCategories();
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

    GetViewCategory = (categoryId, slug) => {
        this.props.navigation.navigate('ViewCategory', {
            categoryId: categoryId,
            imageSrc: Images[`${slug}`]
        });
    }

    Search = () => {
        this.setState({
            loading: true,
            page: 0,
            data: []
        }, () => {
            this.LoadCategories();
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
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={this.GetViewCategory.bind(
                                this,
                                item.id,
                                item.slug
                            )}
                        >
                            <Image
                                source={Images[`${item.slug}`]}
                                style={{ height: imageHeight, width: imageWidth }}
                            />
                            <Text
                                style={styles.RowContainer}

                            >
                                {item.name.replace("&#039;", "'")} ({item.count})
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={this.Refresh}
                    refreshing={this.state.refreshing}
                    onEndReached={() => this.LoadMore()}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={() => {
                        if (this.state.loadMore) {
                            return <View style={{ flex: 1, paddingTop: 20 }}>
                                <ActivityIndicator size="large" color="#2196f3" />
                            </View>
                        }
                        return null;
                    }}
                    onEndReachedThreshold='0.3'
                />
            </View>
        );
    }
}

export default CategoryPage;