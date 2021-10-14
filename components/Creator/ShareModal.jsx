import React, {useState, useEffect} from 'react';
import { FaFacebook, FaHeart, FaPlay } from 'react-icons/fa';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import { ImCross } from 'react-icons/im';

// interface propsForUse {
//   modal: () => void;
//   modalClosed: () => void;
// }
const ShareModal=({ modalClosed })=>{
     //const [origin, setOrigin] = useState();

      const clickedClose = () => {
    modalClosed();
  };

    // useEffect(() => {
    //     setOrigin(window.location.origin);
    // }, []);
    // const getTelegramShareLink = () => {
    // const url = encodeURIComponent(`${origin}/audio/${data._id}`);
    // const text = `${'Hear it on : '}`;
    // return `https://telegram.me/share/url?url=${url}&text=${text}`;
    // };

    // const getWhatsAppShareLink = () => {
    //     const url = `${origin}/audio/${data._id}`;
    //     const text = `Hear it on :  ${url}`;
    //     return decode(`whatsapp://send?text=${text}`);
    // };

    // const getFacebookShareLink = () => {
    //     try {
    //     const url = encodeURIComponent(`${origin}/audio/${data._id}`);
    //     const text = encodeURIComponent(
    //         `${'Hear it on: '}${origin}/audio/${data._id}`
    //     );
    //     return `https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=${FACEBOOK_APP_ID}`;
    //     } catch (error) {
    //     console.log('Window not defined');
    //     }
    // };

    return(
        <>
            <div>
                <div>
                     <button onClick={clickedClose} className="top-right">
                        <ImCross />
                    </button>
                </div>

             
            </div>
        </>
    )
}