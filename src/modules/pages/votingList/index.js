import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../../components/errorMessage';
import LoadingMessage from '../../components/loadingMessage';
import StartEndDate from "../../components/startEndDate";

export default () => {
  const [{ response, isLoading, error}, doFetch] = useFetch('/voting/all');

  useEffect(() => {
    doFetch({
      queryFields:{
        limit: 10,
        offset: 0
      }
    });
  }, [doFetch]);

  return (
    <div className = "container">
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