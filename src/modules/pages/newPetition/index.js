import React, { useContext, useState } from "react";
import { userContext } from '../../contexts/user';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../../components/errorMessage';
import LoadingMessage from '../../components/loadingMessage';

const NewPetition = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [{ isLoading, error}, doFetch] = useFetch('/petition/create');
  const [userState] = useContext(userContext);
  const user_id = userState && userState.user && userState.user.user_id;

  const handleFormSubmit = e => {
    e.preventDefault();
    doFetch({
      method: 'post',
      queryFields: {
      author_user_id: user_id,
      name,
      description
      }
    })
  }

  return (
    <div className = "container mt-5">
      {error && <ErrorMessage error = { error } />}
      {isLoading && <LoadingMessage />}
      {!error && !isLoading && (
        <form onSubmit = {handleFormSubmit}>
          <div className="form-group">
            <label 
              htmlFor="name"
              style = {{
                fontSize: "1.3rem"
              }}
            >Назва петиції</label>
            <input
              type="text" 
              className="form-control" 
              id="name" 
              placeholder="Введіть назву петиції"
              onChange = {e => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label 
              htmlFor="description"
              style = {{
                fontSize: "1.3rem"
              }}
            >Опис петиції</label>
            <textarea
              rows="8"
              className="form-control" 
              id="name" 
              placeholder="Введіть назву петиції"
              onChange = {e => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-lg btn-warning btn-block">Створити петицію</button>
        </form>
      )}
    </div>
  )
}

export default NewPetition;