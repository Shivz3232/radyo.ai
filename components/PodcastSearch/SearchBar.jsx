import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { GrSearch } from 'react-icons/gr';

const SearchBar = ({ setData, category, data }) => {
  const val = useRef();
  const [query, setQuery] = useState('');
  useEffect(() => {
    //@ts-ignore
    val.current.value = '';
    setQuery('');
    //@ts-ignore
    val.current.blur();
    setData({ searched: false, data: [], loading: false });
  }, [category, setData]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function loadResults() {
    //@ts-ignore
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
      //@ts-ignore
      val.current.blur();
      //////////scroll to search bar
      // var element = document.getElementById('search-bar-start');
      // if (element) element.classList.remove('hidden');
      // if (element)
      //   element.scrollIntoView({
      //     behavior: 'smooth',
      //     block: 'start',
      //     inline: 'nearest',
      //   });
      val.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      // var time;
      // time = setTimeout(() => {
      //   if (element) element.classList.add('hidden');
      //   clearTimeout(time);
      // }, 600);
    }
  }
  return (
    <div className="podcast-search-bar">
      <div className="search-input-field">
        <div className="relative flex w-full flex-wrap items-stretch mb-3 align-center">
          {data.searched && (
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
              <BiArrowBack
                color="grey"
                className="inline cursor-pointer"
                onClick={() => {
                  setData({ searched: false });
                  setQuery(null);
                  //@ts-ignore
                  val.current.value = '';
                  //@ts-ignore
                  val.current.blur();
                }}
              />
            </span>
          )}
          <input
            type="text"
            ref={val}
            onKeyPress={e => {
              const keyCode = e.code || e.key;
              if (keyCode === 'Enter') loadResults();
            }}
            value={query}
            onChange={handleChange}
            placeholder="Search based on podcast name/creator name"
            className={`${'px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow border border-blueGray-900 outline-none focus:border-white focus:outline-none focus:ring-2 focus:ring-indigo-650 w-full pr-10'} ${
              data.searched ? 'pl-10' : ''
            }`}
          />
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-3 pr-3 py-4">
            <GrSearch
              className="inline mb-1 cursor-pointer"
              onClick={loadResults}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
