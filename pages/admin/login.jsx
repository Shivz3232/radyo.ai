import React, { useState } from 'react';
// import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import Router from 'next/router';
import { useUser } from '../../utils/hooks';

const Login = () => {
  const user = useUser({
    redirectTo: '/admin/dashboard',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async e => {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Invalid values enterd');
      alert(errorMsg);
      return;
    }

    const body = {
      username,
      password,
    };

    try {
      const res = await axios.post('/api/auth/login', body);
      if (res.status === 200) {
        Router.push('/admin/dashboard');
      } else {
        throw new Error(res.statusText);
      }
    } catch (error) {
      setErrorMsg('Failed to authenticate. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <div className="relative flex flex-wrap mb-3 align-center">
          <input
            type="text"
            onKeyPress={e => {
              const keyCode = e.code || e.key;
              if (keyCode === 'Enter') loadResults();
            }}
            value={username}
            onChange={e => {
              setUserName(e.target.value);
            }}
            placeholder="Username"
            className={`${'px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow border border-blueGray-900 outline-none focus:border-white focus:outline-none focus:ring-2 focus:ring-indigo-650 w-full pr-10'} `}
          />
        </div>
        <div className="relative flex flex-wrap mb-3 align-center">
          <input
            type="password"
            onKeyPress={e => {
              const keyCode = e.code || e.key;
              if (keyCode === 'Enter') loadResults();
            }}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className={`${'px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow border border-blueGray-900 outline-none focus:border-white focus:outline-none focus:ring-2 focus:ring-indigo-650 w-full pr-10'} `}
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
