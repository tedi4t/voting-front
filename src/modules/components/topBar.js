import React from "react";
import { Link, NavLink } from "react-router-dom";

export default () => {
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
          <li className = "nav-item px-4">
            <Link to = "/petition" className = "nav-link">
              <i class="fas fa-plus pr-1"></i>
              <span>
                Нова Петиція
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}