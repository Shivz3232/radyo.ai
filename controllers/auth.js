import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebaseClient from '../utils/firebase/firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [username, setUserName] = useState(null);
  const [userid, setUserId] = useState(null);
  const [useremail, setUserEmail] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async user => {
      if (!user) {
        setUserName(null);
        setUserId(null);
        setUserEmail(null);
        nookies.set(undefined, 'token', '', { path: '/' });
        return;
      }

      const token = await user.getIdToken();
      setUserName(user.displayName);
      setUserId(user.uid);
      setUserEmail(user.email);
      nookies.set(undefined, 'token', token, { path: '/' });
    });
  }, []);
  return (
    <AuthContext.Provider value={{ username, userid, useremail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
