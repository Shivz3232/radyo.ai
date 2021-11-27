import React, { useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';

const AccordionPlaylistList = ({ playlistId, podcastList }) => {
  const [audioList, setAudioList] = useState(podcastList);

  const audioIdIndex = audioId => {
    const itemCount = audioList.length;
    let audioIndexInList = -1;
    for (let i = 0; i < itemCount; i++) {
      if (audioList[i]._id == audioId) {
        audioIndexInList = i;
        break;
      }
    }
    return audioIndexInList;
  };

  const removeAudio = async (playlistObjId, audioId) => {
    try {
      await axios.post(`/api/remove_audio/${playlistObjId}`, {
        AudioId: audioId,
      });
      setAudioList(audioList.filter(e => e._id !== audioId));
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <>
      {audioList.map((elem, key) => {
        return (
          <div className="flex gap-3 p-4 m-auto bg-white shadow-xl" key={key}>
            <div className="flex-2 rounded w-10 h-10">
              <img src={elem.coverImage} alt="coverImage" />
            </div>
            <div className="flex-2 w-2/6 break-all">{elem.title}</div>
            <div className="flex-2 w-1/6  break-all">{elem.creatorName}</div>
            <div className="flex-2 w-1/6  break-all">{elem.category}</div>
            <div className="flex-1 w-1/6">
              <RiDeleteBin6Line
                onClick={() => {
                  removeAudio(playlistId, elem._id);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AccordionPlaylistList;
