import axios from 'axios';
import { useState, useEffect } from 'react';
import queryCoder from '../../utils/queryCoder';

export default () => {
  const baseUrl = 'https://voting--system.herokuapp.com';

  const [ response, setResponse ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ options, setOptions ] = useState(null);
  const [ url, setUrl ] = useState('');

  const doFetch = (url = '', options = {}) => {
    setUrl(url)
    setOptions(options);
    setIsLoading(true);
  }

  useEffect(() => {
    if (!isLoading) return;

    const fullUrl = baseUrl + url + queryCoder(options.data);

    axios(fullUrl, options)
      .then(res => {
        console.log({response, error, isLoading});
        setResponse(res);
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      })
  }, [isLoading, options, error, response, url]);

  return [{response, error, isLoading}, doFetch];
}