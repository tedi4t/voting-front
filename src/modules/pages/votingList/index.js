import React, { useEffect, useState } from "react";
// import { useContext } from "react";
import { Link, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../../components/errorMessage';
import LoadingMessage from '../../components/loadingMessage';
import StartEndDate from "../../components/startEndDate";
// import { userContext } from "../../contexts/user";
import queryDecoder from "../../../utils/queryDecoder";
import { Fragment } from "react";
import Pagination from "../../components/pagination";

const VotingList = ({ location }) => {
  const [url, setUrl] = useState('/voting/all');
  const [{ response, isLoading, error}, doFetch] = useFetch(url);
  // const [userState] = useContext(userContext);
  const [searchText, setSearchText] = useState('');
  const [createVotingBtnClicked, SetCreateVotingBtnClicked] = useState(false);

  const queryObj = queryDecoder(location.search);
  const page = queryObj.page || 1;
  const limit = 10;
  const totalRecords = (response && response.count) || 1;
  const totalPages = Math.ceil(totalRecords / limit)

  // const status =  userState.user && userState.user.status;

  useEffect(() => {
    doFetch({ queryFields: {
      limit: 10,
      offset: (page - 1) * 10,
    } });
  }, [doFetch, page, url]);

  const handleSearchForm = () => {
    doFetch({
      queryFields: {
      limit: 10,
      offset: 0,
      searchText
    }});
  }

  const handleNewPetitionClick = () => {
    SetCreateVotingBtnClicked(true);
  }

  if (createVotingBtnClicked) {
    return (
      <Redirect to = '/voting/new' />
    )
  }

  return (
    <div className = "container">
      {/* {status === 1 && ( */}
        <button 
          className = "btn btn-lg btn-secondary mt-2"
          onClick = {handleNewPetitionClick}
          style = {{
            borderRadius: "50px",
          }}
        >
          <i className = "fas fa-plus"></i> &nbsp;
          Додати нове голосування
        </button>
      {/* )} */}
      <div className = "mt-3 clearfix">
        <input 
          type = "text"
          className = "form-group form-control w-75 float-left"
          placeholder = "Введіть назву голосування"
          value = {searchText}
          onChange = {e => setSearchText(e.target.value)}
        />
        <div className = "w-25 float-left pl-3">
          <button 
            onClick = { handleSearchForm }
            className = "btn btn-warning w-100"
          >
            Знайти
          </button>
        </div>
      </div>
      {error && <ErrorMessage error = { error } />}
      {isLoading && <LoadingMessage />}
      {response && (
        <Fragment>
          <div 
            className = "row mt-4"
            style = {{
              fontSize: "1.2rem",
            }}  
          >
            <div className = "col-md-6 col-sm-12 text-center border-right">
              <span 
                className = "border-bottom border-warning"
                onClick = {
                  () => setUrl('/voting/all')
                }
              >
                Усі голосування
              </span>
            </div>
            <div className = "col-md-6 col-sm-12 text-center border-right">
              <span 
                className = "border-bottom border-warning"
                onClick = {
                  () => setUrl('/voting/current')
                }
              >
                Активні голосування
              </span>
            </div>
          </div>
          {
            response.result.map((voting, indx) => (
              <div
                key = {indx}
                className = "border-bottom"
              >
                <Link
                  to = {`/voting/${voting.voting_id}`}
                  className = "py-4 px-4"
                  style = {{ 
                    color: 'black', 
                    textDecoration: 'none' 
                  }}
                >
                  <h3 
                    className = "display-4 mb-1" 
                    style = {{ fontSize: '2rem' }}
                  >
                    {voting.name}
                  </h3>
                  <div 
                  className = "text-muted"
                  style = {{ fontSize: '0.8rem' }}
                  >
                    <i className="fas fa-clock mr-2"></i>
                    <StartEndDate 
                      start_date = {voting.start_date} 
                      end_date = {voting.end_date}
                    />
                  </div>
                  <div
                    className = "mt-3"
                    style = {{ fontSize: '1.1rem' }}
                  >
                    {
                      voting.description.length > 100 ?
                      <span>{voting.description.split('').splice(0, 100).join('')}...</span> :
                      <span>{voting.description}</span>
                    }
                  </div>
                </Link>
              </div>
            ))
          }
          <div
            className = "my-5 d-grid align-items-center"
          >
            <Pagination location = {location} totalPages = {totalPages}/>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default VotingList;