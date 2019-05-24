import React, {Component} from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'



class AgeInput extends Component{

    // placeNameChangedHandler = (val) => {
    //     this.setState({placeName: val})
    // }
    placeUsiaChangedHandler = (val) => {
        this.setState({placeUsia: val})
    }
    // placeJabatanChangedHandler = (val) => {
    //     this.setState({placeJabatan: val})
    // }

    render(){
        return(
            <View style={styles.inputContainer}>
            {/* <DefaultInput
                placeholder='Nama'
                value = {this.props.placeName}
                onChangeText = {this.props.onChangeText}
            /> */}
            <DefaultInput
                placeholder='Usia'
                value = {this.props.placeUsia}
                onChangeText = {this.props.onChangeText}
            />
            {/* <DefaultInput
                placeholder='Jabatan'
                value = {this.props.placeJabatan}
                onChangeText = {this.props.onChangeText}
            /> */}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    inputContainer: {
        width: '100%'
    },
    // backgroundImage: {
    //     width: '100%',
    //     flex: 1,
    // }
})

export default ( AgeInput);