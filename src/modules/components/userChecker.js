'use strict';
import React, { useContext, useEffect } from "react";
import { userContext } from "../contexts/user";
import { useCookies } from "react-cookie";
import useFetch from "../hooks/useFetch";

export default ({ children }) => {
  const [userState, dispatch] = useContext(userContext);
  const [cookie, setCookie] = useCookies();
  const [{ response, isLoading, error }, doFetch] = useFetch();

  useEffect(() => {
    if (!cookie.token) return;
    const token = cookie.token;
    doFetch(`/user/token/${token}`);
  }, [cookie]);

  useEffect(() => {
    if (!response) return;
    dispatch({
      type: 'SET_AUTHORIZED',
      payload: {
        user: response
      }
    });
  }, [response]);

  return children;
}