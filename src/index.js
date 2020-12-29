import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CookiesProvider } from "react-cookie";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { UserProvider } from './modules/contexts/user';
import UserChecker from './modules/components/userChecker';

import TopBar from "./modules/components/topBar";
import Routes from "./modules/routes";

function App () {
  return (
    <div>
      <UserProvider>
        <CookiesProvider>
          <UserChecker>
            <Router>
                <TopBar />
                <Routes />
            </Router>
          </UserChecker>
        </CookiesProvider>
      </UserProvider>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
