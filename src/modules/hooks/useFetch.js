import axios from 'axios';
import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import queryCoder from '../../utils/queryCoder';

export default url => {
  const baseUrl = 'https://voting--system.herokuapp.com';

  const [ response, setResponse ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ options, setOptions ] = useState(null);

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, [])

  useEffect(() => {
    if (!isLoading) return;

    const fullUrl = baseUrl + url + queryCoder(options.queryFields);

    axios(fullUrl, options)
      .then(res => {
        setIsLoading(false);
        setResponse(res.data);
        setError(null);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.response.data);
      })
  }, [isLoading, options, error, response, url]);

  return [{response, error, isLoading}, doFetch];
}