import axios from 'axios';
import { useState, useEffect } from 'react';

export default () => {
  const baseUrl = 'http://localhost:5000';

  const { response, setResponse } = useState('');
  const { isLoading, setIsLoading } = useState(false);
  const { error, setError } = useState(null);
  const { options, setOptions } = useState(null);
  const {url, setUrl} = useState('');

  const doFetch = (url = '', options = {}) => {
    setUrl(url)
    setOptions(options);
    setIsLoading(true);
  }

  useEffect(() => {
    if (!isLoading) return;

    axios(baseUrl + url, options)
      .then(res => {
        setResponse(res);
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      })
  }, [isLoading, options]);

  return [{response, error, isLoading}, doFetch];
}