import React, { Component } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';

const items = [{
    id: '92iijs7yta',
    name: 'Ondo'
}, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
}, {
    id: '16hbajsabsd',
    name: 'Calabar'
}, {
    id: 'nahs75a5sg',
    name: 'Lagos'
}, {
    id: '667atsas',
    name: 'Maiduguri'
}, {
    id: 'hsyasajs',
    name: 'Anambra'
}, {
    id: 'djsjudksjd',
    name: 'Benue'
}, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
}, {
    id: 'suudydjsjd',
    name: 'Abuja'
}
];

class AddEntryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organizationName: '',
            department: '',
            firstName: '',
            lastname: '',
            selectedItems: [],
            errorMessage: '',
            isFormValid: true,
            apiResult: '',
            isLoading: false
        }
    }

    static navigationOptions = {
        title: 'Submit New Entry',
    };

    AddEntry = () => {
        if (this.state.organizationName == null || this.state.organizationName.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The Organization Name field is required'
            });
        } else if (this.state.department == null || this.state.department.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The Department field is required'
            });
        } else if (this.state.firstName == null || this.state.firstName.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The First Name field is required'
            });
        } else if (this.state.lastname == null || this.state.lastname.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The Last Name field is required'
            });
        } else {
            this.setState({
                isFormValid: true,
                errorMessage: '',
                isLoading: true
            });

            fetch(baseUrl + '/entry', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_name: this.state.organizationName,
                    department: this.state.department,
                    firstName: this.state.firstName,
                    lastname: this.state.lastname
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        apiResult: responseJson.toString()
                    });
                    if (responseJson.success) {
                        this.setState({
                            isLoading: false
                        });
                        this.ClearState();
                        Alert.alert('Add Entry Success', 'Entry has been saved successfully', [{
                            text: 'OK',
                            onPress: () => {
                                this.ClearState();
                            }
                        }], {
                            cancelable: false
                        });
                    } else {
                        this.setState({
                            isLoading: false
                        });
                        Alert.alert('Failed to save entry');
                    }
                })
                .catch((error) => {
                    this.setState({
                        isLoading: false
                    });
                    console.error(error);
                });
        }
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    renderError = () => {
        if (!this.state.isFormValid) {
            return <Text style={{
                color: 'red'
            }}>
                {this.state.errorMessage}
            </Text>
        } else {
            return null;
        }
    }

    ClearState = () => {
        this.setState({
            organizationName: '',
            department: '',
            firstName: '',
            lastname: '',
            errorMessage: '',
            isFormValid: true,
            apiResult: ''
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
            <ScrollView style={styles.FormContainer}>
                <Text style={{ fontSize: 20, marginRight: 25, textAlign: 'center', marginBottom: 7 }}>
                </Text>

                <TextInput
                    placeholder='Input Organization Name'
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            organizationName: value
                        })
                    }
                    onSubmitEditing={(event) => {
                        this.refs.txtDepartment.focus();
                    }}
                    value={this.state.organizationName} />

                <TextInput
                    ref='txtDepartment'
                    placeholder='Input Department Name'
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            department: value
                        })
                    }
                    onSubmitEditing={(event) => {
                        this.refs.txtFirstName.focus();
                    }}
                    value={this.state.department} />

                <TextInput
                    ref='txtFirstName'
                    placeholder='Input First Name'
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            firstName: value
                        })
                    }
                    onSubmitEditing={(event) => {
                        this.refs.txtLastName.focus();
                    }}
                    value={this.state.firstName != 0 ? this.state.firstName.toString() : ''} />

                <TextInput
                    ref='txtLastName'
                    placeholder='Input Last Name'
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            lastname: value
                        })
                    }
                    onSubmitEditing={(event) => {
                        this.AddEntry();
                    }}
                    value={this.state.lastname != 0 ? this.state.lastname.toString() : ''} />

                <View
                    style={{ width: '90%' }}
                >
                    <MultiSelect
                        hideTags
                        items={items}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Pick Categories"
                        searchInputPlaceholderText="Search Category..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        displayKey="name"
                        submitButtonColor="#00BCD4"
                        submitButtonText="Complete"
                    />
                    <View>
                        {this.multiSelect ? this.multiSelect.getSelectedItemsExt(this.state.selectedItems) : null}
                    </View>
                </View>

                {this.renderError()}

                <TouchableOpacity
                    activeOpacity={.4}
                    style={styles.TouchableOpacityStyle}
                    onPress={this.AddEntry}>
                    <Text style={styles.TextStyle}> Save </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.4}
                    style={styles.TouchableOpacityStyle}
                    onPress={this.ClearState}>
                    <Text style={styles.TextStyle}> Clear </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default AddEntryPage;