import axios from 'axios';

export const emailUtil = async (username, useremail, templatename) => {
  let payload = JSON.parse(process.env.EMAIL_MICROSERVICE_PAYLOAD_TEMPLATE);
  payload['username'] = username;
  payload['useremail'] = useremail;
  payload['template'] = templatename;

  await axios({
    method: 'POST',
    url: process.env.EMAIL_MICROSERVICE_ENDPOINT,
    data: payload,
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};
