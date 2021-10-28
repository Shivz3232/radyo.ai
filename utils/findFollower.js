export const findFollower = (followers, uid) => {
  let foundFollower = -1;
  let i = 0;
  while (i < followers.length) {
    if (followers[i]['uid'].toString() === uid) {
      foundFollower = i;
      break;
    }
    i = i + 1;
  }
  return foundFollower;
};
