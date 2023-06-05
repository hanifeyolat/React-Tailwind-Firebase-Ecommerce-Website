import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn3mc6cCEiWpokzqPvOYXPKT4IWCMS3pA",
  authDomain: "hnfshop-b7dc3.firebaseapp.com",
  projectId: "hnfshop-b7dc3",
  storageBucket: "hnfshop-b7dc3.appspot.com",
  messagingSenderId: "474876618334",
  appId: "1:474876618334:web:a480f619688b0b50f4b6cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)




