import React, { useContext } from "react";
import logo from "./images/LabelVoting.png";
import { userContext } from "../../contexts/user";

const homePage = () => {
  const [userState] = useContext(userContext);
  const isLoggedIn = userState.isLoggedIn;

  return (
    <div>
      <div 
        id = "banner"
        className = "text-center mt-3"
        style = {{
          height: "300px"
        }}
      >
        <img src = {logo} className = "h-100" alt="logo"/>
      </div>

      <div
        className = "text-warning container text-center mt-5 font-weight-light"
        style = {{
          fontSize: "2rem"
        }}  
      >
        { !isLoggedIn && (
          <p>
            Зареєструйтесь щоб продовжити
          </p>
        )
        }
      </div>
    </div>
  )
}

export default homePage;