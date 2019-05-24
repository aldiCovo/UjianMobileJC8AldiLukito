import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA46ck18BK2lFbqRvWg1VLlCSLxC-u36zk",
    authDomain: "tester-e0ae9.firebaseapp.com",
    databaseURL: "https://tester-e0ae9.firebaseio.com",
    projectId: "tester-e0ae9",
    storageBucket: "tester-e0ae9.appspot.com",
    messagingSenderId: "335372238659",
    appId: "1:335372238659:web:2022bd75f2d3d6e4"
 };
 // Initialize Firebase
 export const Fire = firebase.initializeApp(firebaseConfig);