import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import queryCoder from '../../utils/queryCoder';

const UseFetch = url => {
  // const baseUrl = 'https://voting--system.herokuapp.com';
  const baseUrl = 'http://localhost:5000';

  const [ response, setResponse ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ options, setOptions ] = useState(null);
  const [cookie] = useCookies(['token']);
  const token = cookie.token;

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, [])

  useEffect(() => {
    if (!isLoading) return;

    if (options.queryFields)
      options.queryFields.token = token;
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
  }, [isLoading, options, error, response, token, url]);

  return [{response, error, isLoading}, doFetch];
}

export default UseFetch;