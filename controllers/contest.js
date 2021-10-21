import ContestModel from '../models/contest';

export const getAllContest = async () => {
  const contests = await ContestModel.find({}).catch(console.error);
  if (contests) {
    let temp = JSON.stringify(contests);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getLatestMonthContest = async () => {
  const contests = await ContestModel.find({
    active: true,
    contest_type: 'month',
  }).catch(console.error);
  if (contests) {
    let temp = JSON.stringify(contests);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getLatestYearContest = async () => {
  const contests = await ContestModel.find({
    active: true,
    contest_type: 'year',
  }).catch(console.error);
  if (contests) {
    let temp = JSON.stringify(contests);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};
export const getLatestContest = async () => {
  const contests = await ContestModel.find({
    active: true,
    $or: [{ contest_type: 'year' }, { contest_type: 'month' }],
  }).catch(console.error);
  if (contests) {
    let temp = JSON.stringify(contests);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getContestDetails = async url_name => {
  //   console.log('url :', url_name);
  const contest = await ContestModel.findOne({ url_name: url_name }).catch(
    console.error
  );
  if (contest) {
    // console.log('controller:', contest);
    let temp = JSON.stringify(contest);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getContestIds = async () => {
  const names = await ContestModel.find({}, 'name url_name _id').catch(
    console.error
  );
  if (names) {
    const paths = names.map(elem => {
      return {
        path: elem.url_name,
        // path: elem.name.toLowerCase().split(' ').join('-'),
        // id: elem._id,
      };
    });
    return paths;
  } else {
    return [];
  }
};
