import React from "react";

export default ({ error }) => {
  return (
    <div className = "mb-3">
      <span className = "text-danger font-weight-bold">
        { error || '' }
      </span>
    </div>
  )
}