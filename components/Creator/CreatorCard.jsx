import React,{useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import SubscribeModal from './SubscribeModal';
import UnsubscribeModal from './UnsubscribeModal';
import axios from 'axios'

const CreatorCard = ({ data }) => {
   const [open, setOpen] = useState(false);
   const [open1, setOpen1] = useState(false);
   const [follow, setFollow] = useState(false);

  const cancelCloseHandler = () => {
    setOpen1(false);
  };
  const cancelCloseHandler1 = () => {
    setOpen1(false);
  };

  const openFollow=()=>{
    if(follow===true){
      setOpen1(true)
    }
    else{
      setOpen(true)
    }
  }
  //console.log("Creator",creator)

  useEffect(() => {
    setFollow(JSON.parse(window.localStorage.getItem('follow')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('follow', follow);
  }, [follow]);


  console.log("follow status", follow)
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
        <button className={follow===true?"fsButton2":"fsButton1"} onClick={()=>openFollow()}>
         {follow === true ? "Following" : "Follow"}
        </button>
        <button className="shareButton" >Share</button>

         <Modal open={open} onClose={cancelCloseHandler}>
            <div>
              <SubscribeModal follow={follow} setFollow={setFollow} setOpen={setOpen}/>
            </div>
         </Modal>

         <Modal open={open1} onClose={cancelCloseHandler1}>
            <div>
              <UnsubscribeModal follow={follow} setFollow={setFollow} setOpen1={setOpen1}/>
            </div>
         </Modal>
      </div>
    </>
  );
};

export default CreatorCard;
