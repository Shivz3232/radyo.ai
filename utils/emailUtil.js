import axios from 'axios';
import { AES, enc, lib } from 'crypto-js';

const encryptMessage = message => {
  var key = enc.Utf8.parse(process.env.EMAIL_MICROSERVICE_CLIENTID);
  var iv = lib.WordArray.random(16);
  var encrypted = AES.encrypt(JSON.stringify(message), key, { iv: iv });
  return iv.concat(encrypted.ciphertext).toString(enc.Base64);
};

export const emailUtil = async payload => {
  try {
    if (payload['username'] && payload['useremail'] && !payload['template']) {
      const data = { data: encryptMessage(payload) };
      await axios({
        method: 'POST',
        url: process.env.EMAIL_MICROSERVICE_ENDPOINT,
        data: data,
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => {
          console.log('Email trigger sent');
        })
        .catch(error => {
          console.log('Error sending email trigger');
        });
    }
  } catch (error) {
    console.log('Error sending email trigger during pre-processing');
  }
};
