import React from "react";

const errorMessage = ({ error }) => {
  return (
    <div className = "mb-3">
      <span className = "text-danger font-weight-bold">
        { error || '' }
      </span>
    </div>
  )
}

export default errorMessage;