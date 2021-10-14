import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import ShareModal from './ShareModal';
import { ImCross } from 'react-icons/im';

const CreatorCard = ({ data }) => {
   const [open, setOpen] = useState(false);
  //  const confirmCloseHandler = () => {
  //   setOpen(false);
  //   setOpenNew(true);
  // };
  const cancelCloseHandler = () => {
    setOpen(false);
  };

  const clickedClose = () => {
    setOpen(false);
  };


  console.log("open status", open)
  return (
    <>
      <div className="creator-card mini generic-card">
      <div className="creator-card--image">
            <img
              className="creator-card__roundedimage"
              src={
                data.avatarImage
                  ? data.avatarImage
                  : '/lovebytes/images/Picture1.jpg'
              }
              alt="Love"
            />
          </div>
        <div className="creator-card__header">
          
          <div className="creator-card__header--items">
            <div className="creator-card__header--item creator-card__author">
              {data.creatorName}
            </div>
            <div className="creator-card__header--item creator-card__aboutme">
              {data.about}
            </div>
          </div>
        </div>

        {/* <button className="subscribe-btn">Subscribe</button> */}
      </div>

      
        <div className="creatorCard__action--row">
          <div className="creator-card__action">
            <span className="creator-card__action--item">
              {data.audiosPublished}
            </span>
            <span className="creator-card__action--item">Audios </span>
          </div>
          <div className="creator-card__action">
            <span className="creator-card__action--item">{data.playCount}</span>
            <span className="creator-card__action--item"> Plays</span>
          </div>
          <div className="creator-card__action">
            <span className="creator-card__action--item">
              {data.subscriberCount}
            </span>
            <span className="creator-card__action--item">Followers</span>
          </div>
        </div>

      <div className="button-container">
        <button className="playButton">Play All</button>
        <button className="fsButton">Follow</button>
        <button className="fsButton" onClick={()=>setOpen(true)}>Share</button>
         <Modal open={open} onClose={cancelCloseHandler}>
            <div>
              <button onClick={clickedClose} className="top-right">
                <ImCross />
              </button>
          </div>
         </Modal>
        
        
      </div>
    </>
  );
};

export default CreatorCard;
