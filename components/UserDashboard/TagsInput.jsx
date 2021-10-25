import React, { useCallback } from 'react';
import Tags from '@yaireo/tagify/dist/react.tagify';

const TagsInput = ({ addHashTags }) => {
  const onChange = useCallback(e => {
    addHashTags(e.detail.tagify.getCleanValue());
  }, []);

  return (
    <Tags
      defaultValue="Music,Song"
      onChange={onChange}
      className="tags-Input-Field"
    />
  );
};

export default TagsInput;
