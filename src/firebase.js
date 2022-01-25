import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//firebase config is unique to every user. This config will not work in your case.
//Get your firebase config from (https://console.firebase.google.com/project/{project_name}/settings/general/)
const firebaseConfig = {
	apiKey: "AIzaSyBAqFEG-Ke0aNvG3_F2fawGqPJWpwSqIOQ",

	authDomain: "whatsapp-clone-9ba28.firebaseapp.com",

	projectId: "whatsapp-clone-9ba28",

	storageBucket: "whatsapp-clone-9ba28.appspot.com",

	messagingSenderId: "34427087935",

	appId: "1:34427087935:web:526c4f1237f9adff079c8a",

	measurementId: "G-MVR3M24BFM",
};

//For cloud firestore initialization and usage.
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

//for google authentication purposes
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
