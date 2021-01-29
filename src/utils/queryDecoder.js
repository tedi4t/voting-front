const queryDecoder = (str = '') => {
  const strArr = str.split('');
  strArr.shift();
  const strTrimmed = strArr.join('');
  const queryArgs = strTrimmed.split('&').map(str => {
    const keyVal = str.split('=');
    return [keyVal[0], keyVal[1]];
  });
  const queryObj = {};
  queryArgs.forEach(arg => {
    const key = arg[0];
    const val = arg[1];
    queryObj[key] = val;
  })
  return queryObj;
}

export default queryDecoder;