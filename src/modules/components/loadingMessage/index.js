import React from "react";
import loadingLogo from './loading.gif'

export default () => {
  return (
    <div style = {{
      zIndex: 10,
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'grid',
      alignItems: "center",
      justifyItems: "center"
    }}>
      <img 
        src = { loadingLogo } 
        alt = "loading..." 
        style = {{
          maxWidth: '300px',
          width: '25%'
        }}
      />
    </div>
  )
}