import React from 'react';
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import firebase from "firebase/app";
import "firebase/auth";
import nookies from "nookies";
import { verifyIdToken } from '../utils/firebase/firebaseAdmin';

export const getServerSideProps = async(context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {},
    };
  }
  catch (err) {
    console.log("User not authenticated");
    return { props: {} };
  }
}

const loginWithGoogle = async () => { 
  var provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

const loginWithGoogleRedirection = async () => { 
  var provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth()
  .signInWithRedirect(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

const loginWithFacebook = async () => { 
  var provider = new firebase.auth.FacebookAuthProvider();
  await firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
  }).catch(async (error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    if(errorCode === "auth/account-exists-with-different-credential"){
        loginWithGoogleRedirection();
    }
    var credential = error.credential;
  });
}

const Login = () => {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      window.location = '/'; //After successful login, user will be redirected to /
    }
  });

  return(
    <>
      <div className="relative flex-auto items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 bg-no-repeat bg-cover relative items-center">
      <div className="mt-2 items-center z-10">
          <form className="p-14 bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden p-6 space-y-10">
              <h2 className="text-4xl font-bold text-center text-indigo-600">Login</h2>
              <div className="break-words text-center">
                Be a part of community of listeners and creators, all connected through the power of creativity &amp; talent.
              </div>
              <div>
                <FacebookLoginButton onClick={()=>{loginWithFacebook()}} />
              </div>
              <div>
                <GoogleLoginButton onClick={()=>{loginWithGoogle()}} />
              </div>
              <div className="text-xs break-words text-center">
                By signing up and logging in I agree to <a href="#" className="underline">Terms and Conditions</a> and <a href="#" className="underline">Privacy Policy</a>.
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
