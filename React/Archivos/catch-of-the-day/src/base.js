import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDWgvc8NGg0Lj_UwwZCLSyiVWZQEij7SYY",
	authDomain: "pesca-del-dia-archu-react.firebaseapp.com",
	databaseURL: "https://pesca-del-dia-archu-react.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
