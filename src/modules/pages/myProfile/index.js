import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { userContext } from "../../contexts/user";
import useFetch from "../../hooks/useFetch";
import UserIcon from "./images/userIcon.jpg";
import LoadingMessage from "../../components/loadingMessage";
import ErrorMessage from "../../components/errorMessage";
import dateStrinfify from "../../../utils/dateStringify";
import { Redirect } from "react-router-dom";

const MyProfile = () => {
  const [, , removeCookie] = useCookies(['token']);
  const [userState] = useContext(userContext);
  const [tokenRemoved, setTokenRemoved] = useState(false);
  const user = userState && userState.user;

  const [{response, isLoading, error}, doFetch] = useFetch('/districts');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const handleLogoutClick = (e) => {
    e.preventDefault();

    removeCookie('token');
    setTokenRemoved(true);
  }

  if (tokenRemoved) {
    return (
      <Redirect to = "/" />
    )
  }
  
  return (
    <div className = "container mt-5">
      {
        response && user && (
          <div className = "row">
            <div className = "col-6 offset-3 col-md-4 offset-md-4 col-lg-6 offset-lg-0 px-5 px-md-4 px-lg-5">
              <img src = {UserIcon} className = "w-100" alt = "user icon"/>
            </div>
            <div 
              className = "col-12 col-lg-6"
              style = {{
                fontSize: "1.2rem",
              }}
            >
              <div>
                Ім'я: { user.name }
              </div>
              <div>
                Прізвище: { user.surname }
              </div>
              <div>
                Дата народження: { dateStrinfify(user.birthday_date) }
              </div>
              <div>
                Стать: { user.gender }
              </div>
              <div>
                Email: { user.email }
              </div>
              <div>
                Округ: { response[user.district_id].name }
              </div>
              <button 
              className = "btn btn-block btn-outline-warning mt-4"
              onClick = { handleLogoutClick }
              >
                Вийти з аккаунту
              </button>
            </div>
          </div>
        )
      }
      {
        isLoading && (
          <LoadingMessage />
        )
      }
      {
        error && (
          <ErrorMessage error = {error} />
        )
      }
    </div>
  )
}

export default MyProfile;