import avatar from '../../assets/Avatar.png';
import React, { useState, useEffect } from 'react';
import { RiArrowDropDownFill } from 'react-icons/ri';
import firebase from 'firebase';
import axios from 'axios';

const HeaderAvatar = ({ data }) => {
  const [avatarImage, setAvatarImage] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      if (firebase.auth().currentUser) {
        const user = firebase.auth().currentUser.email;
        const data = {
          user: user,
        };
        await axios({
          method: 'post',
          url: '/api/getUserProfile',
          data: data,
          headers: { 'Content-Type': 'application/json' },
        })
          .then(user => {
            setAvatarImage(user.data[0].avatarImage);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, 1000);
  }, []);

  return (
    <div className="flex flex-row items-center  cursor-pointer">
      <img
        src={avatarImage ? avatarImage : avatar.src}
        alt="avatar"
        className="h-12 w-12 rounded-full bg-gray-200 align-middle"
      />
      <div className="w-4 align-middle">
        <RiArrowDropDownFill fontSize="2.5rem" className="-mx-3" />
      </div>
    </div>
  );
};

export default HeaderAvatar;
