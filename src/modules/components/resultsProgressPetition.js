import React from "react";

const resultsProgressPetition = ({ results }) => {
  if (!results.length) {
    return (
      <div
        style = {{
          fontSize: "1.25rem"
        }}
      >
        Немає жодної інформації про результати голосування
      </div>
    )
  }

  const votesNumber = results[0] && Number(results[0].votes);
  const totalVotes = 200;

  return (
    <div>
      <div
        className = "text-left"
      >
        <span
          style = {{
            fontSize: "1.7rem"
          }}
        >
          {votesNumber}
        </span>  
        &nbsp;&nbsp;
        <span className = "text-muted">
          голос
        </span>
      </div>
      <div 
        className="progress mb-2"
        style = {{
          height: "3px"
        }}
      >
        <div 
          className="progress-bar bg-warning" 
          role="progressbar" 
          aria-valuenow="0" 
          aria-valuemin="0" 
          aria-valuemax="100"
          style = {{
            width: `${Math.ceil(votesNumber / totalVotes * 100)}%`,
          }}
        >
        </div>
      </div>
    </div>
  )
}

export default resultsProgressPetition;