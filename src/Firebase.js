
import firebase from 'firebase'
import 'firebase/firestore'

// firebase init 
const config = {
    apiKey: "AIzaSyBwU70IW6keooAPok4CNBuJdlIsD0kdcy0",
    authDomain: "movie-time-0.firebaseapp.com",
    databaseURL: "https://movie-time-0.firebaseio.com",
    projectId: "movie-time-0",
    storageBucket: "movie-time-0.appspot.com",
    messagingSenderId: "891751693891",
  };
firebase.initializeApp(config)

// firebase utils
const db = firebase.database()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}


// firebase collections
const usersCollection = db.ref('users')
const showsCollection = db.ref('shows')
const reviewsCollection =db.ref('reviews')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    showsCollection,
    reviewsCollection,
}

