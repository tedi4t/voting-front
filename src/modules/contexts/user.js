'use strict';

import React, { createContext, useReducer } from 'react';

const reducer = (state, action) => {
  const actions = {
    'SET_AUTHORIZED': () => ({
      isLoading: false,
      isLoggedIn: true,
      user: action.payload.user
    }),
    'SET_UNAUTHORIZED': () => ({
      isLoading: false,
      isLoggedIn: false,
      user: null,
    }),
    'SET_ISLOADING': () => ({
      ...state,
      isLoading: true,
    }),
  }
  return actions[action.type]() || state;
}

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
  }
  const value = useReducer(reducer, initialState);
  
  return (
    <userContext.Provider value = {value}>
      {children}
    </userContext.Provider>
  )
}