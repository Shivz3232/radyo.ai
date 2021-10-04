import * as admin from 'firebase-admin';
const serviceAccount = JSON.parse(process.env.FIREBASE_SECRET);

export const verifyIdToken = token => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error;
    });
};
