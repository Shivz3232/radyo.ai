import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS_ID } from '../../constants';

export const initGA = () => {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  });
};

export const trackPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
