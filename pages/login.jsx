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
import PodcastCreatorModel from '../models/podcastCreator';
import { useAuth } from '../controllers/auth';
import { initGA, trackPageView } from '../components/Tracking/tracking';
import { emailUtil } from '../utils/emailUtil';
import { possibleuid } from '../controllers/getuserdata';
import {
  TERMS_AND_CONDITIONS_ENDPOINT,
  PRIVACY_POLICY_ENDPOINT,
} from './../constants';
import loginchill from '../assets/loginchill.png';

export const getServerSideProps = async context => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    try {
      const userInfo = await createUser(context, token, 'NONE');
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
    console.log('User not authenticated', err);
    return {
      props: {},
    };
  }
};

const createUser = async (context, token, rcode) => {
  const user = new PodcastCreatorModel({
    creatorName: token.name,
    email: token.email,
    uid: await possibleuid(token.email),
    avatarImage: token.picture,
    about: token.name,
    audiosPublished: 0,
    playCount: 0,
    subscriberCount: 0,
    referralCode: RCG.alpha('lowercase', 6),
    referrerCode: 'NONE',
    contact: '',
    followers: [],
  });

  const userInfo = await PodcastCreatorModel.findOne({
    email: token.email,
  }).catch(console.error);
  if (userInfo) {
    return userInfo;
  } else {
    const saveUserInfo = await user.save().catch(console.error);
    emailUtil({
      username: token.name,
      useremail: token.email,
      template: 'RADYO_WELCOME',
    });
    return userInfo;
  }
};

const Login = () => {
  // const [showModalonLogin, setshowModalonLogin] = useState('invisible');
  // const [modalusername, setmodalusername] = useState('User');
  const [showLoginLoader, setshowLoginLoader] = useState('hidden');
  const [showLoginForm, setshowLoginForm] = useState('visible');
  const router = useRouter();
  const { userid } = useAuth();

  useEffect(() => {
    initGA();
    trackPageView();
  }, []);

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
      <div className="h-screen relative flex-auto items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 bg-no-repeat bg-cover relative items-center">
        <div className="sm:flex justify-center mt-2 z-10">
          <form className="p-6 bg-white max-w-sm rounded-xl shadow-xl overflow-hidden space-y-10">
            <h2 className="text-4xl font-bold text-center text-indigo-650">
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
              <a href={TERMS_AND_CONDITIONS_ENDPOINT} className="underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href={PRIVACY_POLICY_ENDPOINT} className="underline">
                Privacy Policy
              </a>
              .
            </div>
          </form>
          <div className="pt-4 pb-4 max-w-sm ml-4">
            <h2 className="h-1/6 text-l sm:text-2xl text-left text-black break-words mb-2 ">
              Get famous and become leading social media influencer.
            </h2>
            <div className="h-5/6 bg-white">
              <img
                src={loginchill.src}
                alt="chillradyo"
                className="h-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
