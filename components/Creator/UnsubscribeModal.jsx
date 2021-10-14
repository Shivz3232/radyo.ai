import React, {useState, useEffect} from 'react';
import { ImCross } from 'react-icons/im';

const SubscribeModal=({ setOpen1, follow, setFollow })=>{
    

  const unsubscribe=()=>{
    setFollow(false);
    setOpen1(false);
    //modalClosed();
  }

  const closeModal=()=>{
      setOpen1(false);
  }

   
    return(
        <>
            <div>
                <div className="unsubscribe-modal">
                     <div className="header-section">
                        <h1 className="heading">Are you sure you want to unsubscribe?</h1>
                        <div className="close-button"><ImCross onClick={()=>closeModal()}/></div>
                    </div>
                    <div className="options">
                        <button className="unsubscribe-button" onClick={()=>unsubscribe()}>Unsubscribe</button>
                        <button className="cancel-button" onClick={()=>closeModal()}>Cancel</button>
                    </div>
                   
                </div>

             
            </div>
        </>
    )
}

export default SubscribeModal