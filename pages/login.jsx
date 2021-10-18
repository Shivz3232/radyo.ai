import { React, useState, useEffect } from 'react';
import RCG from 'referral-code-generator';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import nookies from 'nookies';
import { verifyIdToken } from '../utils/firebase/firebaseAdmin';
import connect from '../utils/middleware/mongoClient';
import PodcastCreatorModel from '../models/podcastCreator';
import { useAuth } from '../controllers/auth';

export const getServerSideProps = async context => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    try {
      connect(createUser(token, 'NONE'));
    } catch (err) {
      console.log(err);
    }
    console.log('User authenticated');
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  } catch (err) {
    console.log('User not authenticated');
    return {
      props: {},
    };
  }
};

const createUser = async (token, rcode) => {
  const user = new PodcastCreatorModel({
    creatorName: token.name,
    email: token.email,
    uid: token.email.split('@')[0],
    avatarImage: token.picture,
    about: token.name,
    audiosPublished: 0,
    playCount: 0,
    subscriberCount: 0,
    referralCode: RCG.alpha('lowercase', 6),
    referrerCode: 'NONE',
    contact: '',
  });

  await PodcastCreatorModel.find({ email: token.email }).then(
    async userExists => {
      if (userExists.length == 0) {
        await user
          .save()
          .then(() => {
            return true;
          })
          .catch(err => {
            return false;
          });
      }
    }
  );
};

const Login = () => {
  // const [showModalonLogin, setshowModalonLogin] = useState('invisible');
  // const [modalusername, setmodalusername] = useState('User');
  const [showLoginLoader, setshowLoginLoader] = useState('hidden');
  const [showLoginForm, setshowLoginForm] = useState('visible');
  const router = useRouter();
  const { userid } = useAuth();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(() => {
      if (userid) {
        setshowLoginLoader('visible');
        setshowLoginForm('hidden');
        router.push('/login');
      }
    });
  });

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const { credential, user, accessToken } = result;
        /*
        if (result.additionalUserInfo.isNewUser == true) {
          setshowModalonLogin('visible');
          setmodalusername(user.displayName);
          router.push('/login');
        } else {
          router.push('/');
        }
        */
      })
      .catch(error => {
        const { code, message, email, credential } = error;
      });
  };

  const loginWithGoogleRedirection = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .signInWithRedirect(provider)
      .then(result => {
        const { credential, user, accessToken } = result;
      })
      .catch(error => {
        const { code, message, email, credential } = error;
      });
  };

  const loginWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    // Maybe use signin with redirect instead of signin with
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const { credential, user, accessToken } = result;
        /*
        if (result.additionalUserInfo.isNewUser == true) {
          setshowModalonLogin('visible');
          setmodalusername(user);
          router.push('/login');
        } else {
          router.push('/');
        }
        */
      })
      .catch(error => {
        const { code, message, email, credential } = error;
        if (code === 'auth/account-exists-with-different-credential') {
          loginWithGoogleRedirection();
        }
      });
  };
  /*
      <div>
        <Modal showModal={showModalonLogin} modalusername={modalusername} />
      </div>
  */
  return (
    <>
      <div className="relative flex-auto items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 bg-no-repeat bg-cover relative items-center">
        <div className="mt-2 items-center z-10">
          <form className="p-14 bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden p-6 space-y-10">
            <h2 className="text-4xl font-bold text-center text-indigo-600">
              Login
            </h2>
            <div className="break-words text-center">
              Be a part of community of listeners and creators, all connected
              through the power of creativity &amp; talent.
            </div>
            <div className={showLoginLoader}>
              <div className=" flex justify-center items-center z-40">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            </div>
            <div className={showLoginForm}>
              <FacebookLoginButton onClick={loginWithFacebook} />
            </div>
            <div className={showLoginForm}>
              <GoogleLoginButton onClick={loginWithGoogle} />
            </div>
            <div className="text-xs break-words text-center">
              By signing up and logging in I agree to{' '}
              <a href="#" className="underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
