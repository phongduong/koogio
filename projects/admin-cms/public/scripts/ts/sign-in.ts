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
        setCookie("idToken", authResult.credential.idToken);
      }

      return true;
    }
  },
  signInSuccessUrl: "/"
});

const setCookie = (cname, cvalue, exdays = 30) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = cname => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
