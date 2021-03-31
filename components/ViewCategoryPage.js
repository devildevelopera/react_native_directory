import React from 'react';
import { View, FlatList, ActivityIndicator, Text, TextInput } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';


class ViewCategoryPage extends React.Component {
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
        title: 'Entries'
    };

    componentDidMount() {
        this.LoadEntires();
    }

    LoadEntires = () => {
        let url = baseUrl + '/entry'
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
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

    GetViewEntry = (entryId) => {
        this.props.navigation.navigate('ViewEntry', {
            entryId: entryId
        });
    }

    Search = () => {
        Search = () => {
            const filteredJson = this.state.data.filter((item) => item.fn.rendered.toLowerCase().includes(this.state.keyword.toLowerCase()));
            this.setState({
                filteredData: filteredJson,
            });
        }
    }

    renderHeader = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
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
                <View
                    style={{
                        height: 1,
                        backgroundColor: "#CED0CE"
                    }}
                />
                <FlatList
                    data={this.state.filteredData}
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
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}

export default ViewCategoryPage;