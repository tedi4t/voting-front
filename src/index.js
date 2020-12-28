import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CookiesProvider } from "react-cookie";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import TopBar from "./modules/components/topBar";
import Routes from "./modules/routes";

function App () {
  return (
    <div>
      <Router>
        <CookiesProvider>
          <TopBar />
          <Routes />
        </CookiesProvider>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
