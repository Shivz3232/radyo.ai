import React, {useState, useEffect} from 'react';
import { ImCross } from 'react-icons/im';

// interface propsForUse {
//   modal: () => void;
//   modalClosed: () => void;
// }
const SubscribeModal=({ setOpen, follow, setFollow })=>{
     

//     const clickedClose = () => {
//     modalClosed();
//   };

const closeModal=()=>{
    setOpen(false);
}

  const subscribe=()=>{
    setFollow(true);
    setOpen(false);
    //modalClosed();
  }

   
    return(
        <>
            <div>
                <div className="subscribe-modal">
                    <div className="header-section">
                        <h1 className="heading">Login to Follow </h1>
                        <div className="close-button"><ImCross onClick={()=>closeModal()}/></div>
                    </div>
                    
                    <div className="login-section">
                    <button className="gmail-login" onClick={()=>subscribe()}>Login via Gmail</button>
                    <button  className="facebook-login" onClick={()=>subscribe()}>Login via Facebook</button>
                    </div>
                </div>

             
            </div>
        </>
    )
}

export default SubscribeModal