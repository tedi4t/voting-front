import makeTwoDigit from "./makeTwoDigit";

export default date => {
  if (!typeof date !== Date)
  date = new Date(date);

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