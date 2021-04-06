import { Platform, StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5722',
        borderRadius: 5,
    },

    TouchableOpacityStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 7,
        backgroundColor: '#00BCD4'
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },

    RowTitleContainer: {
        fontSize: 20,
        color: '#FF5722',
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 10
    },

    RowContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },

    FormContainer: {
        flex: 1,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0,
        marginLeft: 5,
        marginRight: 5,
        paddingHorizontal: 35,
        backgroundColor: '#fff'
    },

    BaseView: {
        flex: 1,
        backgroundColor: '#fff'
    },

    SearchBox: {
        fontSize: 16,
        textAlign: 'center',
        height: 40
    },

    mapView: {
        height: 300,
        position: 'relative'
    },

    map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    multiSelectView: {
        borderWidth: 1,
        borderColor: '#FF5722',
        borderRadius: 5,
        marginBottom: 7,
    },

    BusinessHoursSectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
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