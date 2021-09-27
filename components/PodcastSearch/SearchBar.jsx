import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

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
        .get(`/api/podcasts/search?query=${query}`)
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
    }
  }
  return (
    <div className="podcast-search-bar">
      <div className="search-input-field">
        <TextField
          className="size-full"
          label="Search podcast"
          variant="outlined"
          inputRef={val}
          onKeyPress={e => {
            const keyCode = e.code || e.key;
            if (keyCode === 'Enter') loadResults();
          }}
          value={query}
          onChange={handleChange}
          InputProps={{
            startAdornment: !data.searched ? null : (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => {
                    setData({ searched: false });
                    setQuery(null);
                    //@ts-ignore
                    val.current.value = '';
                    //@ts-ignore
                    val.current.blur();
                  }}
                >
                  <KeyboardBackspaceIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={loadResults}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
