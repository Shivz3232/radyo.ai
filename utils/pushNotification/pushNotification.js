const checkforSW = () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    main();
  } else {
    console.log(
      'Looks like this Browser is not compatible with Notification Service!, please try switching to https (secure) version of the website.'
    );
  }
};

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('sw.js');
  return swRegistration;
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  if (permission === 'granted') {
    const swRegistration = await registerServiceWorker();
  } else {
    console.log('Permission Denied');
  }
};

const main = async () => {
  const permission = await requestNotificationPermission();
};

export { checkforSW };
