import { React } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BiError } from 'react-icons/bi';
import { useState, useEffect } from 'react';

const OptionBlock = props => {
  const cards = [];
  if (props.playlistsOptions.length) {
    props.playlistsOptions.map((elem, i) => {
      cards.push(
        <option key={i} value={elem._id}>
          {elem.title}
        </option>
      );
    });
  }

  return (
    <select
      className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-grey-darker"
      id="chooseAddToPlaylist"
      onChange={e => {
        props.setAddToPlaylistName(['update', e.target.value]);
      }}
    >
      <option value="0">Select a playlist name</option>
      {cards}
    </select>
  );
};

const CreatePlaylistModal = props => {
  const router = useRouter();
  const [showError, setshowError] = useState(['hidden', '']);
  const [addToPlaylistName, setAddToPlaylistName] = useState(['', '']);
  const [showChoosePlaylist, setShowChoosePlaylist] = useState(
    props.showChoosePlaylist ? 'visible' : 'hidden'
  );

  const addPlaylist = async (title, audioId) => {
    const data = { title, audioId };
    await axios({
      method: 'post',
      url: '/api/createPlaylist',
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.data.success == true) {
          props.setCreatePlaylist('hidden');
          setshowError(['hidden', '']);
        } else if (res.data.success == false) {
          setshowError(['visible', 'Playlist Name alredy exists']);
        }
      })
      .catch(error => {
        setshowError(['visible', 'Failed to add playlist']);
      });
  };

  const addToPlaylistHelper = async (plid, audioId) => {
    const data = { plid, audioId };
    await axios({
      method: 'post',
      url: '/api/addToPlaylist',
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.data.success == true) {
          props.setCreatePlaylist('hidden');
          setshowError(['hidden', '']);
        }
      })
      .catch(error => {
        setshowError(['visible', 'Failed to add to playlist']);
      });
  };

  const addToPlaylist = setCreatePlaylist => {
    if (addToPlaylistName[0] === 'add' && addToPlaylistName[1]) {
      addPlaylist(
        addToPlaylistName[1],
        props.playlistAudioId ? props.playlistAudioId : []
      );
    } else if (addToPlaylistName[0] === 'update' && addToPlaylistName[1]) {
      addToPlaylistHelper(addToPlaylistName[1], props.playlistAudioId);
    }
  };

  return (
    <div
      className={'z-40 fixed z-10 inset-0 overflow-y-auto ' + props.showModal}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              className="text-lg font-medium text-indigo-650 w-full text-center"
              id="modal-title"
            >
              Playlist
            </h3>

            <div className={'p-5 text-center ' + showChoosePlaylist}>
              <OptionBlock
                playlistsOptions={props.playlistsOptions}
                setAddToPlaylistName={setAddToPlaylistName}
              />
            </div>

            <div className="p-5 text-center">
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-grey-darker"
                id="playlistName"
                type="text"
                placeholder="New playlist"
                onChange={e => {
                  setAddToPlaylistName(['add', e.target.value]);
                }}
              />
              <div
                className={
                  'w-full text-center text-sm mt-5 text-red-900 ' + showError[0]
                }
                id="errorMessage"
              >
                <span>
                  <BiError color="red-900" className="inline mx-2 w-5 h-5" />
                </span>
                <span> {showError[1]} </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-l from-indigo-650 to-indigo-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                if (showChoosePlaylist === 'visible') {
                  addToPlaylist();
                } else {
                  addPlaylist(
                    document.getElementById('playlistName').value,
                    props.setCreatePlaylist,
                    setshowError,
                    []
                  );
                }
              }}
            >
              Add
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                props.setCreatePlaylist('hidden');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
