import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAtjwSH_PtrQf-QsSHBVCvOfzbEx4uljmU",
  authDomain: "wesbos-9407c.firebaseapp.com",
  databaseURL: "https://wesbos-9407c.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
