import React, { useCallback } from 'react';
import Tags from '@yaireo/tagify/dist/react.tagify';

const TagsInput = () => {
  const onChange = useCallback(e => {
    console.log(e.detail.value);
  }, []);

  return (
    <Tags defaultValue="Music,Shayri" onChange={onChange} className="tags" />
  );
};

export default TagsInput;
