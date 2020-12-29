import { useContext, useEffect } from "react";
import { userContext } from "../contexts/user";
import { useCookies } from "react-cookie";
import useFetch from "../hooks/useFetch";

export default ({ children }) => {
  const [, dispatch] = useContext(userContext);
  const [cookie] = useCookies();
  const token = cookie.token;
  const [{ response }, doFetch] = useFetch(`/user/token`);

  useEffect(() => {
    if (!token) {
      dispatch({
        type: 'SET_UNAUTHORIZED'
      })
      return;
    }
    doFetch({
      queryFields: {
        token
      }
    });
    dispatch({
      type: 'SET_ISLOADING'
    })
  }, [cookie, dispatch, doFetch]);

  useEffect(() => {
    if (!response) return;
    dispatch({
      type: 'SET_AUTHORIZED',
      payload: {
        user: response
      }
    });
  }, [response, dispatch]);

  return children;
}