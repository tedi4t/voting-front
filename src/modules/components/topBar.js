import React, { useContext } from "react";
import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { userContext } from '../contexts/user';

export default () => {
  const [userState, dispatch] = useContext(userContext);

  const { isLoggedIn } = userState;

  return (
    <nav className = "navbar navbar-light bg-light">
      <div className = "container">
        <Link to = "/">
          <span 
            className = "font-weight-bold text-warning navbar-brand"
            style ={{
              fontSize: "2rem"
            }}
          >
            Vote!
          </span>
        </Link>
        <ul className = "navbar-nav flex-row">
          <li className = "nav-item px-4 border-right">
            <NavLink to = "/" className = "nav-link" exact>
              Головна Сторінка
            </NavLink>
          </li>
          {isLoggedIn && (
            <Fragment>
              <li className = "nav-item px-4 border-right">
                <NavLink to = "/petition" className = "nav-link">
                  Петиції
                </NavLink>
              </li>
              <li className = "nav-item px-4">
                <NavLink to = "/voting" className = "nav-link">
                  Голосування
                </NavLink>
              </li>
            </Fragment>
          )}
          {!isLoggedIn && (
            <Fragment>
              <li className = "nav-item px-4 border-right">
                <NavLink to = "/login" className = "nav-link">
                  Вхід
                </NavLink>
              </li>
              <li className = "nav-item px-4 border-right">
                <NavLink to = "/register" className = "nav-link">
                  Реєстрація
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  )
}