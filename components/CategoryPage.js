import React from 'react';
import { View, FlatList, ActivityIndicator, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from '../styles/Styles';
import { baseUrl, Images, entriesConfig } from '../constants/constants';
import { imageHeight, imageWidth } from '../helper/Dimension';

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
            shouldRefresh: false,
            entries: []
        };
    }

    static navigationOptions = {
        title: 'All Categories',
        headerLeft: () => null,
    };

    componentDidMount() {
        this.LoadCategories();
        this.LoadEntires();
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

    LoadEntires = () => {
        let url = baseUrl + '/entry/?page=1&per_page=100';
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
                    this.setState({
                        entries: responseJson,
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
        const filtered = this.state.entries.filter((item) => entriesConfig[slug].includes(item.fn.rendered))
        this.props.navigation.navigate('ViewCategory', {
            categoryId: categoryId,
            imageSrc: Images[`${slug}`],
            filtered: filtered
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
                {this.state.entries.length === 0 ?
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <ActivityIndicator size="large" color="#2196f3" />
                    </View> :
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
                    // onRefresh={this.Refresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={() => this.LoadMore()}
                    // ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={() => {
                    //     if (this.state.loadMore) {
                    //         return <View style={{ flex: 1, paddingTop: 20 }}>
                    //             <ActivityIndicator size="large" color="#2196f3" />
                    //         </View>
                    //     }
                    //     return null;
                    // }}
                    // onEndReachedThreshold='0.3'
                    />
                }
            </View>
        );
    }
}

export default CategoryPage;