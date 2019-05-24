import { ADD_PLACE, DELETE_PLACE, /*EDITE_PLACE,*/ CREATE_DATA } from './actionTypes'

export const addPlace = placeName => {
    return {
        type: ADD_PLACE,
        placeName: placeName
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}

// export const editePlace = (key) => {
//     return {
//         type: EDITE_PLACE,
//         placeKey: key
//     }
// }

export const createData = (items, uid) => {
    var arrData = []
        var rawData = items.val()

        Object.keys(rawData).forEach(id => {
            if (uid === rawData[id].uid) {

                arrData.push({
                    key: id,
                    value: rawData[id].name,
                    value2: rawData[id].usia,
                    value3: rawData[id].jabatan,
                    // value: rawData[id],
                    image: {
                        uri: "https://freerangestock.com/sample/78746/halloween-cat-icon-means-trick-or-treat-and-autumn.jpg"
                    }
                })
            }
        })

    return {
        type: CREATE_DATA,
        payload: arrData
    }
}

// Sebelum bisa get data place berdasarkn uid yang login
// export const createData = (items) => {
//     var arrData = []
//         var rawData = items.val()

//         Object.keys(rawData).forEach(id => {
//             arrData.push({
//                 key: id,
//                 value: rawData[id].name,
//                 image: {
//                     uri: "https://freerangestock.com/sample/78746/halloween-cat-icon-means-trick-or-treat-and-autumn.jpg"
//                 }
//             })
//         })

//     return {
//         type: CREATE_DATA,
//         payload: arrData
//     }
// }





















