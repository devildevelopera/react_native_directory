import { Platform, StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    landingContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },

    landingDropdown: {
        marginHorizontal: 16
    },

    logoStyle: {
        alignSelf: 'center'
    },

    leadButtonsStyle: {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    TextInputStyleClass: {
        height: 40,
        borderWidth: 1,
        marginBottom: 7,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: '#FF5722',
    },

    NotesInputStyleClass: {
        padding: 10,
        height: 120,
        borderWidth: 1,
        marginBottom: 7,
        borderRadius: 5,
        textAlign: 'left',
        textAlign: 'center',
        textAlignVertical: 'top',
        borderColor: '#FF5722',
    },

    TouchableOpacityStyle: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 7,
        backgroundColor: '#acd300'
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },

    RowTitleContainer: {
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10,
        color: '#FF5722',
        paddingRight: 10,
    },

    RowContainer: {
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },

    FormContainer: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingHorizontal: 35,
        backgroundColor: '#fff',
        paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    },

    BaseView: {
        flex: 1,
        backgroundColor: '#fff'
    },

    SearchBox: {
        height: 40,
        fontSize: 16,
        textAlign: 'center',
    },

    mapView: {
        height: 300,
        position: 'relative'
    },

    map: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
    },

    multiSelectView: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 7,
        borderColor: '#FF5722',
    },

    BusinessHoursSectionStyle: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    font16: {
        fontSize: 16,
    },

    ml10: {
        marginLeft: 10
    },

    mr10: {
        marginRight: 10
    },

    width50: {
        width: '50%'
    },

    timeRangeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },

});