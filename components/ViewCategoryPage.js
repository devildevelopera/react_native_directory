import React from 'react';
import { View, FlatList, ActivityIndicator, Text, TextInput, Image } from 'react-native';

import styles from '../styles/Styles';
import { baseUrl, entriesConfig } from '../constants/constants';
import { imageHeight, imageWidth } from '../helper/Dimension';

class ViewCategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            data: [],
            slug: '',
            keyword: '',
            imageSrc: "",
            loading: false,
            pageSize: 100,
            loadMore: false,
            refreshing: false,
            shouldRefresh: false
        };
    }

    static navigationOptions = {
        title: 'Entries'
    };

    componentDidMount() {
        this.setState({
            slug: this.props.navigation.state.params.slug,
            imageSrc: this.props.navigation.state.params.imageSrc,
            data: this.props.navigation.state.params.filtered
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
            </View>
        );
    }
}

export default ViewCategoryPage;