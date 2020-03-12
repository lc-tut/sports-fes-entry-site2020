import * as firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY!,
  authDomain: process.env.FIREBASE_AUTHDOMAIN!,
  databaseURL: process.env.FIREBASE_DBURL!,
  projectId: process.env.FIREBASE_PROJECTID!,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET!,
  messagingSenderId: process.env.FIREBASE_MSGSENDERID!,
  appId: process.env.FIREBASE_APPID!
}

firebase.initializeApp(firebaseConfig)

export default firebase
