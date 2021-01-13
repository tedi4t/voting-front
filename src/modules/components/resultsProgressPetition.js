import React from "react";

export default({ results }) => {
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
        &nbsp;
        <span className = "text-muted">
          голос
        </span>
      </div>
      <div 
        class="progress mb-2"
        style = {{
          height: "3px"
        }}
      >
        <div 
          class="progress-bar bg-warning" 
          role="progressbar" 
          aria-valuenow="0" 
          aria-valuemin="0" 
          aria-valuemax="100"
          style = {{
            width: `${Math.ceil(votesNumber / totalVotes)}%`,
          }}
        >
        </div>
      </div>
    </div>
  )

  // return (
  //   results.map(result => (
  //     <div 
  //       className = "row mb-2" 
  //       key = { result.name }
  //       style = {{
  //         fontSize: "1.25rem"
  //       }}
  //     >
  //       <div className = "col-md-4 col-sm-12">
  //         { result.name }
  //       </div>
  //       <div className = "col-md-8 col-sm-12">
  //         <div 
  //           style = {{ 
  //             height: "100%",
  //             display: "grid",
  //             alignItems: "center"
  //           }
  //         }>
  //           <div 
  //             className = "progress"
  //             style = {{
  //               height: "100%",
  //               maxHeight: "40px"
  //             }}
  //           >
  //             <div 
  //               className = { 
  //                 `progress-bar 
  //                 ${ result.variant_id === variantVoted ? 'bg-danger' : 'bg-warning text-dark'}` 
  //               } 
  //               role = "progressbar" 
  //               aria-valuenow = "0" 
  //               aria-valuemin = "0" 
  //               aria-valuemax = "100"
  //               style = {{
  //                 width: `${ result.votes / totalVotes * 100 }%`,
  //                 height: "100%"
  //               }}
  //             >
  //               { (result.votes / totalVotes * 100).toFixed(2) }%
  //             </div>
  //           </div>
  //           </div>
  //       </div>
  //     </div>
  //   ))
  // )
}