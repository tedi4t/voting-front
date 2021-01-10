import React, { useEffect, Fragment, useState, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import Ze from "./images/ze.jpg"
import StartEndDate from "../../components/startEndDate";
import LoadingMessage from "../../components/loadingMessage";
import ErrorMessage from "../../components/errorMessage";
import { userContext } from "../../contexts/user";
import Map from "../../components/map";
import Results from "./components/results";

export default ({ match }) => {
  const voting_id = match.params.voting_id;
  const [variant_id, setVariant_id] = useState('');
  const [userState] = useContext(userContext);
  const user_id = userState.user && userState.user.user_id;

  const [{
    response: responseVoting, 
    error: errorVoting, 
    isLoading: isLoadingVoting
  }, doFetchVoting] = useFetch(`/voting/${voting_id}`);
  const [{
    response: responseVariants, 
    error: errorVariants, 
    isLoading: isLoadingVariants
  }, doFetchVariants] = useFetch(`/voting/${voting_id}/variants`);
  const [{
    error: errorVote,
    isLoading: isLoadingVote
  }, doFetchVote] = useFetch(`/voting/${voting_id}/vote`);
  const [{
    response: responseVoteRes, 
    isLoading: isLoadingVoteRes
  }, doFetchVoteRes] = useFetch(`/voting/${voting_id}/voteResult`);
  const [{
    response: responseResults, 
    isLoading: isLoadingResults
  }, doFetchResults] = useFetch(`/voting/${voting_id}/resultGeneral`);
  const [{
    response: responseResultsAllDistricts, 
    isLoading: isLoadingResultsAllDistricts
  }, doFetchResultsAllDistricts] 
    = useFetch(`/voting/${voting_id}/resultAllDistricts`);

  useEffect(() => {
    doFetchVoting();
    doFetchVariants();
    doFetchResults();
    doFetchResultsAllDistricts();
  }, [doFetchVariants, doFetchVoting, doFetchResults]);

  useEffect(() => {
    doFetchVoteRes({
      queryFields: {
        user_id,
        voting_id
      }
    })
    doFetchResults();
  }, [isLoadingVote, doFetchVoteRes, doFetchResults, user_id, voting_id])

  const {
    name: votingName,
    description: votingDescription,
    start_date, end_date
  } = responseVoting[0] || {};

  const response = responseVoting && responseVariants;
  const isLoading = isLoadingVoting || isLoadingVariants || isLoadingVote || 
    isLoadingVoteRes || isLoadingResults || isLoadingResultsAllDistricts;
  const error = errorVoting ? errorVoting : errorVariants;
  const voteRes = responseVoteRes[0] || {};
  const variantVoted = voteRes.variant_id;

  useEffect(() => {
    doFetchVoteRes({
      queryFields: {
        user_id,
        voting_id
      }
    })
  }, [user_id, doFetchVoteRes, voting_id])

  const handleVote = async () => {
    doFetchVote({
      method: "post",
      queryFields: {
        variant_id,
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
              { votingName }
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
              { votingDescription }
            </div>
            <h3
              className = "display-4 mt-4 mb-3"
              style = {{
                fontSize: "2.5rem"
              }}
            >
              Кандидати
            </h3>
            <div className = "row" >
              {
                responseVariants && (
                  responseVariants.map(variant => (
                    <div
                      key = { variant.variant_id }
                      className = "col-lg-4 col-md-6 col-sm-12 pb-4"
                    >
                      <div className = "card">
                        <img 
                          className = "card-img-top" 
                          src = { Ze } 
                          alt = "Candidate" 
                        />
                        <div className = "card-body">
                          <h5 className = "card-title">
                            { variant.name }
                          </h5>
                          <p className = "card-text">
                            { variant.description }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
            <h3 className = "font-weight-light mb-4">
              {
                variantVoted ? 'Результати голосування' : 'Електронний бюлетень'
              }
            </h3>
            {
              !variantVoted && (
                <Fragment>
                  {
                    errorVote && (
                      <ErrorMessage error = { errorVote } />
                    )
                  }
                  <div 
                    onChange = { e => setVariant_id(e.target.value) }
                  >
                    {
                      responseVariants.map(variant => (
                        <div 
                          className = "form-check mb-2" 
                          key = { variant.variant_id }
                          style = {{
                            fontSize: "1.25rem"
                          }}
                        >
                          <input 
                            className = "form-check-input mt-2" 
                            type = "radio"
                            id = { variant.variant_id }
                            value = { variant.variant_id } 
                            name = "votingVariants"
                          />
                          <label
                            className = "form-check-label" 
                            htmlFor = { variant.variant_id }
                          >
                            { variant.name }
                          </label>
                      </div>
                      ))
                    }
                  </div>
                  <button 
                    type = "submit"
                    className = "btn btn-lg btn-warning mt-3 mb-5"
                    disabled = { !variant_id.length }
                    onClick = { handleVote }
                  >
                    Проголосувати
                  </button>
                </Fragment>
              )
            }
            <div className = "mb-5">
              {
                responseResults && variantVoted && responseResultsAllDistricts && (
                  <Fragment>
                    <Results results = {responseResults} variantVoted = {variantVoted} />                  
                    <div className = "d-grid text-center mt-5">
                      <Map 
                        data = {responseResultsAllDistricts}
                        DisplayDataModule = {Results}
                      />
                    </div>
                  </Fragment>
                )
              }
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