const convertMS = (milliseconds) => {
  var hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  hour = hour % 24;
  return {
    hour: hour,
    minute: minute,
    seconds: seconds,
    millis: milliseconds % 1000,
  };
};

export const calulateLapTime = (millis) => {
  const time = convertMS(millis);

  const minutes = time.minute < 10 ? `0${time.minute}` : time.minute;
  const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
  var millis = parseInt(time.millis);

  if (millis < 10) {
    millis = `00${millis}`;
  } else if (millis < 100) {
    millis = `0${millis}`;
  }

  console.log(`original: ${time.millis} - new: ${millis} - ${millis.length}`);
  return `${minutes}:${seconds}:${millis}`;
};
