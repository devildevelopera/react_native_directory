import React, { Component } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';

class AddEntryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organizationName: '',
            department: '',
            firstName: '',
            lastname: '',
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
            <View style={styles.FormContainer}>
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
            </View>
        );
    }
}

export default AddEntryPage;