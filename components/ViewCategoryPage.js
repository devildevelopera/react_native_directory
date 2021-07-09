import React from 'react';
import { View, FlatList, ActivityIndicator, Text, TextInput, Image } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';
import { imageHeight, imageWidth } from '../helper/Dimension';

class ViewCategoryPage extends React.Component {
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
            imageSrc: "",
            shouldRefresh: false
        };
    }

    static navigationOptions = {
        title: 'Entries'
    };

    componentDidMount() {
        this.setState({
            imageSrc: this.props.navigation.state.params.imageSrc
        });

        this.LoadEntires();
    }

    LoadEntires = () => {
        let tempPage = this.state.page + 1;
        let url = baseUrl + '/entry/?page=' + tempPage.toString() + '&per_page' + this.state.pageSize.toString();
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
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
            this.LoadEntires();
        });
    }

    LoadMore = () => {
        if (this.state.loading || this.state.loadMore) return null;

        if (this.state.data.length < this.state.pageSize) return null;

        this.setState({
            loadMore: true
        }, () => {
            this.LoadEntires();
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

    GetViewEntry = (entryId) => {
        this.props.navigation.navigate('ViewEntry', {
            entryId: entryId
        });
    }

    Search = () => {
        this.setState({
            loading: true,
            page: 0,
            data: []
        }, () => {
            this.LoadEntires();
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
                    placeholder='Search Entry'
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
                <Image
                    source={this.state.imageSrc}
                    style={{ height: imageHeight, width: imageWidth }}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View>
                            <Text
                                style={styles.RowContainer}
                                onPress={this.GetViewEntry.bind(
                                    this,
                                    item.id
                                )}
                            >
                                {item.fn.rendered}
                            </Text>
                        </View>
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

export default ViewCategoryPage;