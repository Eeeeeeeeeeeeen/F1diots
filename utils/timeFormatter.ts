const convertMS = (milliseconds: number) => {
  var hour: number, minute: number, seconds: number;
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

export function calulateLapTime(millis: number) {
  const time = convertMS(millis);

  const minutes = time.minute < 10 ? `0${time.minute}` : time.minute;
  const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
  var milliseconds: number = time.millis;
  var mills: string = "000";

  if (milliseconds < 10) {
    mills = `00${milliseconds}`;
  } else if (milliseconds < 100) {
    mills = `0${milliseconds}`;
  }

  return `${minutes}:${seconds}:${mills}`;
}
