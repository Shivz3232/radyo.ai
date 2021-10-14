import { CATEGORY_ENDPOINT } from '../../constants';

export const categoryDataLinks = [
  {
    id: 'all',
    label: 'All',
    url: `/`,
  },
  {
    id: 'songs',
    label: 'Music/Songs',
    url: `${CATEGORY_ENDPOINT}/songs`,
  },
  {
    id: 'comedy',
    label: 'Comedy',
    url: `${CATEGORY_ENDPOINT}/comedy`,
  },
  {
    id: 'shayari',
    label: 'Shayari',
    url: `${CATEGORY_ENDPOINT}/shayari`,
  },
  {
    id: 'stories',
    label: 'Stories',
    url: `${CATEGORY_ENDPOINT}/stories`,
  },
  {
    id: 'dialogues',
    label: 'Dialogues',
    url: `${CATEGORY_ENDPOINT}/dialogues`,
  },
  {
    id: 'motivation',
    label: 'Motivation',
    url: `${CATEGORY_ENDPOINT}/motivation`,
  },
  {
    id: 'poetry',
    label: 'Poetry',
    url: `${CATEGORY_ENDPOINT}/poetry`,
  },
  {
    id: 'education',
    label: 'Education',
    url: `${CATEGORY_ENDPOINT}/education`,
  },
  {
    id: 'others',
    label: 'Others',
    url: `${CATEGORY_ENDPOINT}/others`,
  },
];
