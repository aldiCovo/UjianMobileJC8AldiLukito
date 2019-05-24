import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Fire } from '../../firebase';

import PlaceList from '../../components/PlaceList/PlaceList'

import {createData} from '../../store/actions/places'

class FindPlaceScreen extends Component {

    // Yang Render data place berdasarkan uid dari reducer saat ada perubahan
    componentDidMount(){
        var places = Fire.database().ref('places')
        // ambil semua data di firebase, lempar ke redux
        places.once('value', (items) => {this.props.createData(items, this.props.uid)}, (err) => {console.log(err)})
    }

    // componentwillUpdate() {
    //     var place = Fire.database().ref('places')
    //     place.once('value', (items)=>{this.props.createData(items, this.props.user.uid)}, (err)=> {console.log(err);
    //     })
    // }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    // placeHandler = () => {
    //     var arrData = []
    //     var places = Fire.database().ref('places')
    //     places.on('value', function(snapshot){

    //         var childData = snapshot.val()
    //         Object.keys(childData).forEach((id) => {
    //             arrData.push({
    //                 key: id,
    //                 value: childData[id].name,
    //                 uid: childData[id].uid,
    //                 image: {
    //                     uri: "https://freerangestock.com/sample/78746/halloween-cat-icon-means-trick-or-treat-and-autumn.jpg"
    //                 }
    //             })
    //         })
    //     })
    //     return arrData
    // }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress'){
            if (event.id === 'sideDrawerToggle'){
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    itemSelectedHandler = (key) => {
        // selPlace = {value, key, image}
        // fungsi di bawah untuk mendaptkan place yang saam key nya dengan yang di klik
        const selPlace = this.props.places.find(place => {
            return place.key == key
        })
        this.props.navigator.push({
            screen: 'jc8reactnative.PlaceDetailScreen',
            title: selPlace.value,
            passProps: {
                selectedPlace: selPlace
            }
        })
    }

    render () {
        return (
            <View>
                <PlaceList 
                    places ={this.props.places}
                    // places ={this.placeHandler()}
                    onItemSelected={this.itemSelectedHandler}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places,
        uid: state.auth.user.uid
    }
}



export default connect(mapStateToProps, {createData})(FindPlaceScreen);