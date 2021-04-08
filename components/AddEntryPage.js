import email from 'react-native-email'
import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

import styles from '../styles/Styles';
import baseUrl from '../constants/api';

class AddEntryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            organizationName: '',
            department: '',
            firstName: '',
            lastname: '',
            selectedItems: [],
            businessHours: [],
            date: new Date(),
            email: '',
            phone: '',
            website: '',
            notes: '',
            errorMessage: '',
            isFormValid: true,
            apiResult: '',
            isLoading: false
        }
    }

    static navigationOptions = {
        title: 'Submit New Entry',
        headerLeft: () => null,
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
        } else if (this.state.email == null || this.state.email.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The Email field is required'
            });
        } else if (this.state.phone == null || this.state.phone.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The Phone field is required'
            });
        } else if (this.state.website == null || this.state.website.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The Website field is required'
            });
        } else if (this.state.notes == null || this.state.notes.length == 0) {
            this.setState({
                isFormValid: false,
                errorMessage: 'The Notes field is required'
            });
        } else {
            this.setState({
                isFormValid: true,
                errorMessage: ''
            });

            const { businessHours } = this.state;

            let businessHoursReal = [];
            for (let i = 0; i < businessHours.length; i++) {
                if (!businessHours[i].start_time.includes('Date') && !businessHours[i].end_time.includes('Date')) {
                    let key = businessHours[i].end_time.replace('_end', '');
                    let item = businessHours[i][`${key}`];
                    if (Object.keys(item).length !== 0) {
                        let itemWithDate = {};
                        itemWithDate['Date'] = key;
                        itemWithDate['Start Time'] = new Date(item.start_date).getHours() + ':' + new Date(item.start_date).getMinutes();
                        itemWithDate['End Time'] = new Date(item.end_date).getHours() + ':' + new Date(item.end_date).getMinutes();
                        businessHoursReal.push(itemWithDate);
                    }
                }
            }

            let businessHoursRealString = '';
            for (let i = 0; i < businessHoursReal.length; i++) {
                businessHoursRealString = businessHoursRealString + businessHoursReal[i]['Date'] + '(' + businessHoursReal[i]['Start Time'] + '~' + businessHoursReal[i]['End Time'] + ') \n';
            }

            const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
            email(to, {
                // Optional additional arguments
                cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
                bcc: 'mee@mee.com', // string or array of email addresses
                subject: 'Adding My New Entry',
                body:
                    `Here is my new entry details
Organization Name: ${this.state.organizationName}
Department: ${this.state.department}
First Name: ${this.state.firstName}
Last Name: ${this.state.lastname}
Category: ${this.state.selectedItems.join()}
Business Hours: ${businessHoursRealString.replace(/\s+/g, ' ').trim()}
Email: ${this.state.email}
Phone: ${this.state.phone}
Website: ${this.state.website}
Notes: ${this.state.notes}
`
            }).catch(console.error)

            // fetch(baseUrl + '/entry', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         organizationName: this.state.organizationName,
            //         department: this.state.department,
            //         firstName: this.state.firstName,
            //         lastname: this.state.lastname,
            //         selectedItems: this.state.selectedItems,
            //         businessHours: this.state.businessHours,
            //         email: this.state.email,
            //         phone: this.state.phone,
            //         website: this.state.website,
            //         notes: this.state.notes,
            //     })
            // })
            //     .then((response) => response.json())
            //     .then((responseJson) => {
            //         this.setState({
            //             apiResult: responseJson.toString()
            //         });
            //         if (responseJson.success) {
            //             this.setState({
            //                 isLoading: false
            //             });
            //             this.ClearState();
            //             Alert.alert('Add Entry Success', 'Entry has been saved successfully', [{
            //                 text: 'OK',
            //                 onPress: () => {
            //                     this.ClearState();
            //                 }
            //             }], {
            //                 cancelable: false
            //             });
            //         } else {
            //             this.setState({
            //                 isLoading: false
            //             });
            //             Alert.alert('Failed to save entry');
            //         }
            //     })
            //     .catch((error) => {
            //         this.setState({
            //             isLoading: false
            //         });
            //         console.error(error);
            //     });
        }
    }

    componentDidMount() {
        this.LoadCategories();
    }

    LoadCategories = () => {
        let url = baseUrl + '/category'
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
                    this.setState({
                        loading: false,
                        categories: [...this.state.categories, ...responseJson],
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

    onSelectedItemsChange = (selectedItems) => {
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
            selectedItems: [],
            businessHours: [],
            date: new Date(),
            email: '',
            phone: '',
            website: '',
            notes: '',
            errorMessage: '',
            isFormValid: true,
            apiResult: '',
            isLoading: false
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
                <Text style={{ marginBottom: 7 }}>
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
                    value={this.state.lastname != 0 ? this.state.lastname.toString() : ''}
                />

                <View style={styles.multiSelectView}>
                    <SectionedMultiSelect
                        items={this.state.categories}
                        IconRenderer={MaterialIcons}
                        uniqueKey="name"
                        displayKey="name"
                        selectText="Choose category..."
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                    />
                </View>

                <View style={styles.BusinessHoursSectionStyle}>
                    <Text style={styles.font16, styles.mr10}>
                        Business Hours
                    </Text>
                    <FontAwesomeIcons
                        name="plus-circle"
                        size={20}
                        color="#00BCD4"
                        onPress={() => {
                            let businessHours = JSON.parse(JSON.stringify(this.state.businessHours));
                            businessHours.push({
                                'Monday': {},
                                'Tuesday': {},
                                'Wednesday': {},
                                'Thursday': {},
                                'Friday': {},
                                'Saturday': {},
                                'Sunday': {},
                                "start_time": 'Date',
                                "end_time": 'Date',
                                "start_picker_show": false,
                                "end_picker_show": false,
                            });
                            this.setState({
                                businessHours: businessHours
                            })
                        }}
                    />
                </View>

                {this.state.businessHours.map((item, index) => (
                    <View key={index} >
                        <View style={styles.timeRangeStyle}>
                            <View style={{ flex: 1, marginVertical: 10 }}>
                                <RNPickerSelect
                                    items={[
                                        { label: 'Monday', value: 'Monday' },
                                        { label: 'Tuesday', value: 'Tuesday' },
                                        { label: 'Wednesday', value: 'Wednesday' },
                                        { label: 'Thursday', value: 'Thursday' },
                                        { label: 'Friday', value: 'Friday' },
                                        { label: 'Saturday', value: 'Saturday' },
                                        { label: 'Sunday', value: 'Sunday' },
                                    ]}
                                    placeholder={{ label: 'Date', value: '' }}
                                    onValueChange={item1 => {
                                        let businessHours = [...this.state.businessHours];
                                        item.start_time = item1 + '_start';
                                        item.end_time = item1 + '_end';
                                        this.setState({
                                            businessHours: businessHours
                                        })
                                    }}
                                    style={{ inputAndroid: { color: '#333' } }}
                                />
                            </View>
                            <FontAwesomeIcons
                                style={styles.ml10}
                                name="minus-circle"
                                size={20}
                                color="#FF5722"
                                onPress={() => {
                                    var businessHours = JSON.parse(JSON.stringify(this.state.businessHours));
                                    businessHours.splice(index, 1);
                                    this.setState({
                                        businessHours: businessHours
                                    })
                                }} />
                        </View>

                        {item.start_picker_show &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    let businessHours = [...this.state.businessHours];
                                    item[`${item.start_time.replace('_start', '')}`].start_date = selectedDate;
                                    item.start_picker_show = false;

                                    this.setState({
                                        businessHours: businessHours
                                    })
                                }}
                            />
                        }

                        {item.end_picker_show &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    let businessHours = [...this.state.businessHours];

                                    item[`${item.end_time.replace('_end', '')}`].end_date = selectedDate;
                                    item.end_picker_show = false;

                                    this.setState({
                                        businessHours: businessHours
                                    })
                                }}
                            />
                        }
                        <View style={styles.timeRangeStyle}>
                            {item.start_time !== 'Date' &&
                                <TouchableOpacity
                                    style={styles.width50}
                                    onPress={() => {
                                        let businessHours = [...this.state.businessHours];
                                        item.start_picker_show = true;
                                        this.setState({
                                            businessHours: businessHours
                                        })
                                    }}>
                                    <TextInput
                                        value={item[`${item.start_time.replace('_start', '')}`]?.start_date ? new Date(item[`${item.start_time.replace('_start', '')}`]?.start_date).getHours() + ':' + new Date(item[`${item.start_time.replace('_start', '')}`]?.start_date).getMinutes() : ''}
                                        style={styles.TextInputStyleClass}
                                        placeholder="Start Time"
                                        placeholderTextColor="#a6b0bb"
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            }
                            {item.end_time !== 'Date' &&
                                <TouchableOpacity
                                    style={styles.width50}
                                    onPress={() => {
                                        let businessHours = [...this.state.businessHours];
                                        item.end_picker_show = true;
                                        this.setState({
                                            businessHours: businessHours
                                        })
                                    }}>
                                    <TextInput
                                        value={item[`${item.end_time.replace('_end', '')}`]?.end_date ? new Date(item[`${item.end_time.replace('_end', '')}`]?.end_date).getHours() + ':' + new Date(item[`${item.end_time.replace('_end', '')}`]?.end_date).getMinutes() : ''}
                                        style={styles.TextInputStyleClass}
                                        placeholder="End Time"
                                        placeholderTextColor="#a6b0bb"
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                ))
                }

                <TextInput
                    ref='txtEmail'
                    placeholder='Input Email'
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            email: value
                        })
                    }
                    onSubmitEditing={(event) => {
                        this.refs.txtPhone.focus();
                    }}
                    value={this.state.email != 0 ? this.state.email.toString() : ''} />

                <TextInput
                    ref='txtPhone'
                    placeholder='Input Phone'
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            phone: value
                        })
                    }
                    onSubmitEditing={(event) => {
                        this.refs.txtWebsite.focus();
                    }}
                    value={this.state.phone != 0 ? this.state.phone.toString() : ''} />

                <TextInput
                    ref='txtWebsite'
                    placeholder='Input Website'
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            website: value
                        })
                    }
                    onSubmitEditing={(event) => {
                        this.refs.txtNotes.focus();
                    }}
                    value={this.state.website != 0 ? this.state.website.toString() : ''} />

                <TextInput
                    ref='txtNotes'
                    placeholder='Input Notes'
                    multiline={true}
                    style={styles.NotesInputStyleClass}
                    underlineColorAndroid='transparent'
                    onChangeText={
                        value => this.setState({
                            notes: value
                        })
                    }
                    value={this.state.notes != 0 ? this.state.notes.toString() : ''} />

                { this.renderError()}

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

                <Text style={{ marginTop: 7 }}>
                </Text>

            </ScrollView >
        );
    }
}

export default AddEntryPage;