import React from "react";

const data = ({ mouseLocation, content }) => {
  return (
    <div 
        id = "data"
        className = 'border border-warning px-3 py-2'
        style = {{
          width: "500px",
          display: "block",
          position: "absolute",
          top: `${mouseLocation.y}px`,
          left: `${mouseLocation.x}px`,
          zIndex: "10",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          borderTopRightRadius: "15px",
        }}  
      >
        { content }
      </div>
  )
}

export default data;