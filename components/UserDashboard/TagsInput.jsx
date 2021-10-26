import React, { useCallback } from 'react';
import Tags from '@yaireo/tagify/dist/react.tagify';

const TagsInput = ({ addHashTags }) => {
  const onChange = useCallback(e => {
    addHashTags(e.detail.tagify.getCleanValue());
  }, []);

  return (
    <Tags
      onChange={onChange}
      className="tags-Input-Field"
      placeholder="Add Hashtags"
    />
  );
};

export default TagsInput;
