function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const saveSubscription = async subscription => {
  const SERVER_URL = '/api/pushNotification/subscribe';
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

self.addEventListener('activate', async () => {
  try {
    const applicationServerKey = urlBase64ToUint8Array(
      'BLU8-vOfYG6aIS6ZdJkryFxgJxhtoEgqOwaXgOUtFaAb-2MvW6AZ-D8KGb5RB2OS1aG3ERfpLI8u7ZkIuDF9bfM'
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
  } catch (err) {
    console.log('Error', err);
  }
});

self.addEventListener('push', event => {
  if (event.data) {
    showLocalNotification(
      event.data.json().title,
      event.data.json(),
      self.registration
    );
  } else {
    console.log('Push event but no data');
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.onclick(
    clients.openWindow(
      `https://www.radyo.ai/audio/${event.notification.data._id}?notifId=${event.notification.data.notif_id}`
    )
  );
  event.notification.close();
});

const showLocalNotification = (title, data, swRegistration) => {
  const options = {
    body: data.body,
    icon: data.icon,
    image: data.image_url,
    data: {
      _id: data._id,
      notif_id: data.notif_id,
    },
    tag: data.notif_id,
  };
  swRegistration.showNotification(title, options);
};
