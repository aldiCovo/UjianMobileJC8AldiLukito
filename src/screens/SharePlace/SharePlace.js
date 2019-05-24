import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux'

import { addPlace, createData } from '../../store/actions/index'
import {Fire} from '../../firebase/index'

import imageBackground from '../../assets/react-native-wide.png'
import imageBackgroundWorld from '../../assets/world-map.jpg'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import MainText from '../../components/UI/MainText/MainText'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import AgeInput from '../../components/AgeInput/AgeInput'
import JobInput from '../../components/JobInput/JobInput'

class SharePlaceScreen extends Component {
    state = {
        placeName : '',
        placeUsia : '',
        placeJabatan : ''
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress'){
            if (event.id === 'sideDrawerToggle'){
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    placeNameChangedHandler = (val/*, val1, val2*/) => {
        this.setState({
            placeName: val,
            // placeUsia : val1,
            // placeJabatan: val2
        })
    }
    placeUsiaChangedHandler = (val/*, val1, val2*/) => {
        this.setState({
            // placeName: val,
            placeUsia : val,
            // placeJabatan: val2
        })
    }
    placeJabatanChangedHandler = (val/*, val1, val2*/) => {
        this.setState({
            // placeName: val,
            // placeUsia : val1,
            placeJabatan: val
        })
    }

    // Show Data dari redux
    // showData = items => {
    //     var arrData = []
    //     var rawData = items.val()

    //     Object.keys(rawData).forEach(id => {
    //         arrData.push({
    //             key: id,
    //             value: rawData[id].name,
    //             image: {
    //                 uri: "https://freerangestock.com/sample/78746/halloween-cat-icon-means-trick-or-treat-and-autumn.jpg"
    //             }
    //         })
    //     })

    // }

    placeAddedHandler = () => {
        var places = Fire.database().ref('places')
        if(this.state.placeName.trim() && this.state.placeUsia.trim() && this.state.placeJabatan.trim()!== ''){ // trim() => menghilangkan karakter spasi
            // input data ke firebase
            places.push({
                name: this.state.placeName,
                usia: this.state.placeUsia,
                jabatan: this.state.placeJabatan,
                uid: this.props.prabowo
            }).then(res => {
                // ambil semua data di firebase, lempar ke redux
                places.once('value', this.props.onCreateData, (err)=>{console.log(err)})
            })
        }
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Input Data Karyawan</HeadingText>
                    </MainText>
                    <PlaceInput
                        placeName = {this.state.placeName}
                        onChangeText = {this.placeNameChangedHandler}
                        // placeUsia = {this.state.placeUsia}
                        // onChangeText = {this.placeUsiaChangedHandler}
                        // placeJabatan = {this.state.placeJabatan}
                        // onChangeText = {this.placeJabatanChangedHandler}
                    />
                    <AgeInput
                        placeUsia = {this.state.placeUsia}
                        onChangeText = {this.placeUsiaChangedHandler}
                    />
                    <JobInput
                        placeJabatan = {this.state.placeJabatan}
                        onChangeText = {this.placeJabatanChangedHandler}
                    />
                    <Button title='Input Data' onPress={this.placeAddedHandler}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})

const mapStateToProps = state => {
    return { prabowo: state.auth.user.uid,
           };
  };

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: placeName => dispatch(addPlace(placeName)),
        onCreateData: items => dispatch(createData(items))
    }
}

// export default connect(null, mapDispatchToProps)(SharePlaceScreen)
export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)