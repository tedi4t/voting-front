import React from "react";
import logo from "./images/LabelVoting.png";

export default () => {
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
    </div>
  )
}