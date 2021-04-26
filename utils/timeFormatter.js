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
  var millis;
  switch (time.millis) {
    case time.millis < 10:
      millis = `00${time.millis}`;
      break;
    case time.millis < 100:
      millis = `0${time.millis}`;
    default:
      millis = time.millis;
  }
  return `${minutes}:${seconds}:${millis}`;
};
