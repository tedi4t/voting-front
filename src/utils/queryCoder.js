export default (queryObj = {}) => {
  console.log(queryObj);
  let query = '?';
  const options = [];
  for (const key in queryObj) {
    options.push(`${key}=${queryObj[key]}`);
  }
  query += options.join('&');
  
  return query;
}
