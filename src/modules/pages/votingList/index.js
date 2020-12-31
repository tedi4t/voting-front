import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../../components/errorMessage';
import LoadingMessage from '../../components/loadingMessage';
import StartEndDate from "../../components/startEndDate";
import { userContext } from "../../contexts/user";

export default () => {
  const [{ response, isLoading, error}, doFetch] = useFetch('/voting/all');
  const [userState] = useContext(userContext);
  const [searchText, setSearchText] = useState('');

  const status =  userState.user && userState.user.status;

  useEffect(() => {
    doFetch({ queryFields: {
      limit: 10,
      offset: 0,
    } });
  }, [doFetch]);

  const handleSearchForm = () => {
    doFetch({
      queryFields: {
      limit: 10,
      offset: 0,
      searchText
    }});
  }

  return (
    <div className = "container">
      {status === 1 && (
        <button 
          className = "btn btn-lg btn-secondary mt-2"
          style = {{
            borderRadius: "50px",
          }}
        >
          <i className = "fas fa-plus"></i> &nbsp;
          Додати нове голосування
        </button>
      )}
      <div className = "mt-3">
        <input 
          type = "text"
          className = "form-group form-control w-75 float-left "
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
        response.map(voting => (
          <div
            key = {voting.voting_id}
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
                {voting.description}
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}