// Only upto hours
export const formatDuration = duration => {
  let minutes = Math.floor(duration / 60);
  duration -= minutes * 60;

  let hours = Math.floor(minutes / 60);
  minutes -= hours * 60;

  let seconds = duration;

  let time = '';

  let flag = false;

  if (hours) {
    time += `${hours} hr `;
    flag = true;
  }
  if (minutes || flag) {
    time += `${minutes} min `;
    flag = true;
  }

  time += `${seconds} sec`;

  return time;
};
