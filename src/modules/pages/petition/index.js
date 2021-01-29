import React, { useEffect, Fragment, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import StartEndDate from "../../components/startEndDate";
import LoadingMessage from "../../components/loadingMessage";
import ErrorMessage from "../../components/errorMessage";
import { userContext } from "../../contexts/user";
import ResultsCircle from "./components/resultsCircle";
import Map from "../../components/map";
import ResultsProgressPetition from "../../components/resultsProgressPetition";

const Petition = ({ match }) => {
  const petition_id = match.params.petition_id;
  const [userState] = useContext(userContext);
  const user_id = userState.user && userState.user.user_id;

  const [{
    response: responsePetition, 
    error: errorPetition, 
    isLoading: isLoadingPetition
  }, doFetchPetition] = useFetch(`/petition/${petition_id}`);
  const [{
    response: responseResults, 
    isLoading: isLoadingResults
  }, doFetchResults] = useFetch(`/petition/${petition_id}/resultGeneral`);
  const [{
    error: errorVote,
    isLoading: isLoadingVote
  }, doFetchVote] = useFetch(`/petition/${petition_id}/vote`);
  const [{
    response: responseVoteRes, 
    isLoading: isLoadingVoteRes
  }, doFetchVoteRes] = useFetch(`/petition/${petition_id}/voteResult`);
  const [{
    response: responseResultsAllDistricts, 
    isLoading: isLoadingResultsAllDistricts
  }, doFetchResultsAllDistricts] 
    = useFetch(`/petition/${petition_id}/resultAllDistricts`);

  const totalVotes = (responseResults[0] && responseResults[0].votes) || 0;
  const votesNeeded = 200;
  const degree = (totalVotes / votesNeeded) * 360;
  const insideText = `${totalVotes} голосів з ${votesNeeded} необхідних`;
  const voted = responseVoteRes.length > 0;

  useEffect(() => {
    doFetchPetition();
    doFetchResults();
    doFetchResultsAllDistricts();
  }, [doFetchPetition, doFetchResults, doFetchResultsAllDistricts]);

  useEffect(() => {
    if (!user_id) return;
    doFetchVoteRes({
      queryFields: {
        user_id
      }
    });
    doFetchResults();
    doFetchResultsAllDistricts();
  }, [
      doFetchVoteRes, 
      user_id, 
      isLoadingVote, 
      doFetchResults, 
      doFetchResultsAllDistricts
    ])

  const {
    name: petitionName,
    description: petitionDescription,
    start_date, end_date
  } = responsePetition[0] || {};

  const response = responsePetition && responseResults && responseVoteRes;
  const isLoading = 
    isLoadingPetition || isLoadingResults || isLoadingVote || 
    isLoadingVoteRes || isLoadingResultsAllDistricts;
  const error = errorPetition || errorVote;
  
  const handleVote = (e) => {
    e.preventDefault();
    doFetchVote({
      method: "post",
      queryFields: {
        user_id
      }
    })
  }

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
            <div className = "row">
              <div 
                className = "mt-4 col-md-9"
                style = {{
                  fontSize: "1.5rem"
                }}
              >
                { petitionDescription }
              </div>
              <div className = "col-md-3 mt-4 border border-muted p-4">
                <div className = "text-center p-3">
                  <ResultsCircle 
                    text = {insideText} 
                    degree = {degree}
                  />
                </div>
                <div
                  className = "mt-3 mb-2"
                  style = {{
                    fontSize: "1.2rem"
                  }}
                >
                  Статус:
                </div>
                <div 
                  className = "my-2"
                  style = {{
                    fontSize: "1.2rem"
                  }}
                >
                  Залишилося 30 днів
                </div>
                {
                  voted && (
                    <div>
                      <i className = "fas fa-check"></i> &nbsp;
                      Ви вже проголосували
                    </div>
                  )
                }
                {
                  !voted && (
                    <form onSubmit = {handleVote}>
                      <button
                        className = "btn btn-warning btn-block btn-lg mt-4"
                        type = "submit"
                      >
                        Проголосувати
                      </button>
                    </form>
                  )
                }
              </div>
            </div>
            <div className = "d-grid text-center my-5">
              <Map 
                data = {responseResultsAllDistricts}
                DisplayDataModule = { ResultsProgressPetition }
              />
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

export default Petition;