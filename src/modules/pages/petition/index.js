import React, { useEffect, Fragment, useState, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import StartEndDate from "../../components/startEndDate";
import LoadingMessage from "../../components/loadingMessage";
import ErrorMessage from "../../components/errorMessage";
import { userContext } from "../../contexts/user";

export default ({ match }) => {
  const petition_id = match.params.petition_id;

  const [{
    response: responsePetition, 
    error: errorPetition, 
    isLoading: isLoadingPetition
  }, doFetchPetition] = useFetch(`/petition/${petition_id}`);
  
  useEffect(() => {
    doFetchPetition();
  }, [doFetchPetition]);

  const {
    name: petitionName,
    description: petitionDescription,
    start_date, end_date
  } = responsePetition[0] || {};

  const response = responsePetition;
  const isLoading = isLoadingPetition;
  const error = errorPetition;
  
  return (
    <div className = "container">
      {
        response && (
          <Fragment>
            <div className = "mt-5 display-4">
              { petitionName }
            </div>
            <div 
              className = "text-muted"
              style = {{ fontSize: '0.8rem' }}
              >
                <i className="fas fa-clock mr-2"></i>
                <StartEndDate 
                  start_date = { start_date } 
                  end_date = { end_date }
                />
              </div>
            <hr />
            <div 
            className = "mt-4"
            style = {{
              fontSize: "1.5rem"
            }}
            >
              { petitionDescription }
            </div>
          </Fragment>
        )
      }
      {
        isLoading && (
          <LoadingMessage />
        )
      }
      {
        error && (
          <ErrorMessage error = {error} />
        )
      }
    </div>
  )
}