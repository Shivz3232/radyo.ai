import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { RiPlayListAddLine } from 'react-icons/ri';
import { useAuth } from '../../controllers/auth';
import { useRouter } from 'next/router';
import CreatePlaylistModal from './CreatePlaylistModal';

const SearchBar = ({ setData, category, data }) => {
  const [createPlaylist, setCreatePlaylist] = useState('hidden');
  const { userid } = useAuth();
  const router = useRouter();
  const val = useRef();
  const [query, setQuery] = useState('');
  useEffect(() => {
    val.current.value = '';
    setQuery('');
    val.current.blur();
    setData({ searched: false, data: [], loading: false });
  }, [category, setData]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function loadResults() {
    var element = document.getElementById('searchbar');
    if (element) element.classList.remove('hidden');
    if (element)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    // val.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    //   inline: 'nearest',
    // });
    var time;
    time = setTimeout(() => {
      if (element) element.classList.add('hidden');
      clearTimeout(time);
    }, 600);

    if (query) {
      axios
        .get(`/api/search?query=${query}`)
        .then(res => {
          setData({
            searched: true,
            data: res.data.allAudio,
            loading: false,
            query: query,
          });
        })
        .catch(err => console.log(err));
    }
    val.current.blur();
  }

  useEffect(() => {
    if (window.location.search) {
      setQuery(window.location.search.split('?')[1]);
      loadResults();
    }
  }, [query]);

  return (
    <>{/* Turning off playlist in production
      <CreatePlaylistModal
        showModal={createPlaylist}
        setCreatePlaylist={setCreatePlaylist}
        playlistsOptions={[]}
      />
      */}
      <div className="podcast-search-bar">
        <div className="search-input-field">
          <div className="flex w-full">
            <div className="bg-white flex items-center rounded-xl shadow-2xl w-full text-gray-700 leading-tight border-solid border-2 border-indigo-50">
              <div className=" flex text-center text-blueGray-300  bg-transparent rounded text-lg items-center justify-center w-full ml-10 ">
                {data.searched && (
                  <BiArrowBack
                    color="grey"
                    className="text-center text-blueGray-300 bg-transparent rounded items-center justify-center cursor-pointer mr-3"
                    onClick={() => {
                      setData({ searched: false });
                      setQuery(null);
                      val.current.value = '';
                      val.current.blur();
                      history.back();
                    }}
                  />
                )}
                <input
                  className="w-full focus:outline-none float-right"
                  type="text"
                  ref={val}
                  onKeyPress={e => {
                    const keyCode = e.code || e.key;
                    if (keyCode === 'Enter') loadResults();
                  }}
                  value={query}
                  onChange={handleChange}
                  placeholder="Search based on podcast name/creator name"
                />

                <div className="p-4">
                  <button className="flex bg-gradient-to-l from-indigo-650 to-indigo-600 text-white rounded-full p-2 focus:outline-none w-12 h-12 flex items-center justify-center float-left">
                    <FaSearch
                      className="cursor-pointer"
                      onClick={loadResults}
                    />
                  </button>
                </div>
              </div>
            </div>
            {/* Turning off playlist in production
            <div className="flex items-center w-2/12 leading-tight float-right">
              <button
                type="button"
                tooltip="Create new Playlist"
                className="flex bg-gradient-to-l from-indigo-650 to-indigo-600 text-white rounded-xl w-full h-full p-2 focus:outline-none flex items-center justify-center float-left ml-2 border-solid border-2 border-white"
                data-tip=""
                data-for="newPlaylist"
                onClick={() => {
                  userid ? setCreatePlaylist('visible') : router.push('/login');
                }}
              >
                <span>
                  Add Playlist
                  <RiPlayListAddLine
                    color="white"
                    className="inline w-4 h-4 ml-2"
                  />
                </span>
              </button>
            </div>
            */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
