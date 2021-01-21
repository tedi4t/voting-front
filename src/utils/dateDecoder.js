import makeTwoDigit from "./makeTwoDigit";

const changeTimezone = date => {
  if (typeof date !== Date)
    date = new Date(date);

  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + offset);
  return date;
}

export default date => {
  if (!typeof date !== Date)
    date = new Date(date);

  date = changeTimezone(date);

  let dateDecoded = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes()
  };

  const keys = Object.keys(dateDecoded);
  keys.forEach(key => {
    const val = dateDecoded[key];
    dateDecoded[key] = makeTwoDigit(val);
  });

  return dateDecoded;
}