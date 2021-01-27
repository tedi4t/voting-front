import React, { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { userContext } from '../../contexts/user';
import resizeImage from '../../../utils/resizeImage';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../../components/errorMessage';
import LoadingMessage from '../../components/loadingMessage';
import { Fragment } from "react";

export default ({ location }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [{ response, isLoading, error}, doFetch] = useFetch('/voting/create');
  const [userState] = useContext(userContext);
  const user_id = userState && userState.user && userState.user.user_id;

  const resizer = (variant, image) => {
    const cb = (val) => variant.base64 = val;
    resizeImage(image, cb);
  }

  const getVariantHTML = (variant) => (
    <div>
      <hr className = "bg-warning"/>
      <div className="form-group">
        <label 
          style = {{
            fontSize: "1.2rem"
          }}
        >Назва варіанту</label>
        <input
          type="text" 
          className="form-control" 
          placeholder="Введіть назву варіанту"
          onChange = {e => {
            variant.name = e.target.value;
          }}
        />
      </div>
      <div className="form-group">
        <label 
          style = {{
            fontSize: "1.2rem"
          }}
        >Опис голосування</label>
        <textarea
          rows="3"
          className="form-control" 
          placeholder="Введіть опис варіанту"
          onChange = {e => {
            variant.description = e.target.value;
          }}
        />
        <input 
          type="file" 
          className = "mt-2"
          onChange = { e => {
            const reader = new FileReader();
            reader.onload = e => resizer(variant, e.target.result);
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
      </div>
    </div>
  )

  const [variants, setVariants] = useState([]);

  const checkFilled = text => 
    !!text && text.length;

  const addVariant = () => {
    const initialValue = {
      name: '',
      description: '',
      base64: ''
    }

    if(variants.length === 0) {
      setVariants([initialValue]);
      return;
    }

    const lastVariant = variants[variants.length - 1];
    const { 
      name: lastVarName, 
      description: lastVarDesc 
    } = lastVariant;

    if (checkFilled(lastVarName) && checkFilled(lastVarDesc)) {
      setVariants([...variants, initialValue]);
    }
  }

  useEffect(() => {
    if (variants.length === 0)
      addVariant();
  }, [variants, addVariant])

  const handleFormSubmit = e => {
    e.preventDefault();
    
    const lastVariant = variants[variants.length - 1];
    const { 
      name: lastVarName, 
      description: lastVarDesc 
    } = lastVariant;

    if (!checkFilled(lastVarName) || !checkFilled(lastVarDesc)) {
      variants.pop();
    }

    console.log(variants);

    doFetch({
      method: 'post',
      queryFields: {
        author_user_id: user_id,
        name,
        description,
        // variants: JSON.stringify(variants),
        start_date: new Date(startDate),
        end_date: new Date(endDate)
      },
      data: {
        variants
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
            >Назва голосування</label>
            <input
              type="text" 
              className="form-control" 
              id="name" 
              placeholder="Введіть назву голосування"
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
            >Опис голосування</label>
            <textarea
              rows="8"
              className="form-control" 
              id="name" 
              placeholder="Введіть опис голосування"
              onChange = {e => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="form-group row">
            <div className = "col-md-6">
              <label
                htmlFor="startDate"
                style = {{
                  fontSize: "1.3rem"
                }}
              >Дата початку голосування</label>
              <input
                type = "datetime-local"
                className="form-control" 
                id="startDate"
                onChange = {e => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className = "col-md-6">
              <label
                htmlFor="endDate"
                style = {{
                  fontSize: "1.3rem"
                }}
              >Дата кінця голосування</label>
              <input
                type = "datetime-local"
                className="form-control" 
                id="endDate"
                onChange = {e => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <div 
              style = {{
                fontSize: "1.3rem"
              }}
            >Додайте варіанти</div>
            {
              variants.map((variant, index) => (
                <Fragment key = {index}>
                { getVariantHTML(variant) }
                </Fragment>
              ))
            }
            <button className = "btn btn-outline-warning" type="button" onClick = {addVariant}>
              Додати варіант
            </button>
          </div>
          <button type="submit" className="btn btn-lg btn-warning btn-block mb-5">Створити голосування</button>
        </form>
      )}
    </div>
  )
}