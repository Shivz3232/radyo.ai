import PodcastCreatorModel from '../models/podcastCreator';

export const getuserdata = async useremail => {
  const userData = await PodcastCreatorModel.findOne({ email: useremail });
  if (userData) {
    return JSON.parse(JSON.stringify(userData));
  } else {
    return {};
  }
};

export const possibleuid = async useremail => {
  try {
    const res = await PodcastCreatorModel.find({
      uid: { $regex: '^' + useremail.split('@')[0] },
    });
    let occupiedUidList = [];
    for (let i = 0; i < res.length; i++) {
      occupiedUidList.push(res[i].uid);
    }
    if (occupiedUidList.length == 0) {
      return useremail.split('@')[0];
    }
    let possibleuid = useremail.split('@')[0];
    while (occupiedUidList.indexOf(possibleuid) != -1) {
      possibleuid = possibleuid + Math.floor(Math.random() * 10).toString();
    }
    return possibleuid;
  } catch {}
};
