import { setCookie } from "./_helpers";

declare const firebase;
declare const firebaseui;

const firebaseConfig = {
  apiKey: "AIzaSyBQr3Bzp3FAHDwiipqlSIZOOO0JW66gqsc",
  authDomain: "koogio.firebaseapp.com",
  databaseURL: "https://koogio.firebaseio.com",
  projectId: "koogio",
  storageBucket: "koogio.appspot.com",
  messagingSenderId: "503031321459",
  appId: "1:503031321459:web:e9c5e13d0200284afdab06",
  measurementId: "G-Q2D7NW5N82"
};
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", {
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: authResult => {
      if (authResult) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(idToken => {
            setCookie("idToken", idToken);

            location.href = "/";
          })
          .catch(error => {});
      }
    }
  },
  signInSuccessUrl: "/"
});
