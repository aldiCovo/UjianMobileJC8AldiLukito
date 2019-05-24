import React, { Component } from 'react'
import {View, Image, Text, TextInput, Button, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import { deletePlace } from '../../store/actions/index'
//
//import { editePlace } from '../../store/actions/index'
import {Fire} from '../../firebase/index'

class PlaceDetail extends Component {
    state = {
        edite: true,
        //newPlaceName: ''
    }

    placeDeletedHandler = () => {
        // Delete in Reducer
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop()
        // Delete in database(Firebase)
        Fire.database().ref(`places/${this.props.selectedPlace.key}`).remove()
    }

    placeseditedHandler = () => {
       
        
        this.setState(prevState => {
            return {
                edite: !prevState.edite 
            }
        })
    }

    // placeSaveEditeHandler = () => {
    //     //this.props.onEditePlace(this.props.selectedPlace.key)
    //     this.props.navigator.pop()
    //     // Edite in database(Firebase)
    //     Fire.database().ref(`places/${this.props.selectedPlace.key}`).set({
    //         name: this.state.newPlaceName,
    //         uid: this.props.uid
    //     })
    // }

    

    render() {
        if(this.state.edite){
        return(
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.placeImage}
                        source={this.props.selectedPlace.image}
                    />
                    <Text style={styles.placeName}>Nama : {this.props.selectedPlace.value}</Text>
                    {/* <Text style={styles.placeName}>Nama : {this.props.selectedPlace.value.name}</Text> */}
                    <Text style={styles.placeName}>Usia : {this.props.selectedPlace.value2}</Text>
                    <Text style={styles.placeName}>Jabatan : {this.props.selectedPlace.value3}</Text>
                </View>
                {/* <Button title='Update' color='blue' onPress={this.placeseditedHandler}/> */}
                <Button title='Delete' color='red' onPress={this.placeDeletedHandler}/>
            </View>
            )
            } else {
                return(
                    <View style={styles.container}>
                        <View>
                            {/* <Image
                                style={styles.placeImage}
                                source={this.props.selectedPlace.image}
                            /> */}
                            <TextInput style={styles.placeNameEdite} /*defaultValue={this.props.selectedPlace.value}*/
                            onChangeText={(value) => this.setState({newPlaceName: value})}
                            />
                        </View>
                        {/* <Button title='Update' color='blue' onPress={this.placeseditedHandler}/>
                        <Button title='Delete' color='red' onPress={this.placeDeletedHandler}/> */}
                        <Button title='Save' color='red' onPress={this.placeSaveEditeHandler}/>
                    </View>
                    )
            }
        
    }
}

const styles = StyleSheet.create({
    container : {
        padding: 22
    },
    placeImage: {
        width: '100%',
        height: 220
    },
    placeName : {
        fontWeight: 'bold',
        fontSize : 28,
        textAlign :'center'
    },
    placeNameEdite : {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '100%',
        //height: 150
        
    },
    button : {
        margin: 10
       
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key)),
        // onEditePlace: (key) => dispatch(editePlace(key))
    }
}
const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail)
