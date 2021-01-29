const dateStringify = date => {
  if (typeof date !== Date)
    date = new Date(date);

  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getYear();

  return `${day}.${month}.${year}`;
}

export default dateStringify;