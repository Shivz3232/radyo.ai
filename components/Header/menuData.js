import { categoryDataLinks } from '../CategoryNavBar/categoryData';

export const menuLinks = [
  {
    id: 'home',
    label: 'Home',
    url: '/',
  },
  {
    id: 'categories',
    label: 'Categories',
    url: `${categoryDataLinks[1].url}`,
  },
  {
    id: 'contest',
    label: 'Contest',
    url: '/contest',
  },
  {
    id: 'about-us',
    label: 'About Us',
    url: '/about-us',
  },
];

export const userMenuLinks = [
  {
    id: 'my-profile',
    label: 'My Profile',
    url: '/user/dashboard',
  },
  {
    id: 'my-submissions',
    label: 'My Submissions',
    url: '/user/dashboard',
  },
  {
    id: 'submit-audio',
    label: 'Submit an Audio',
    url: '/user/dashboard',
  },
];
