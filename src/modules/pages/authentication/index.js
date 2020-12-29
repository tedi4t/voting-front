import React, { Fragment, useEffect, useState } from "react";
import useFetch from '../../hooks/useFetch';
import { useCookies } from "react-cookie";

export default ({ location }) => {
  const isLoginPage = location.pathname === '/login';
  const signText = isLoginPage ? "Вхід" : "Реєстрація";

  const [cookie, setCookie] = useCookies(['token']);
  const [{response, isLoading, error}, doFetch] = useFetch();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthday_date, setBirthday_date] = useState('');
  const [gender, setGender] = useState('male');
  const [district_id, setDistrict_id] = useState('0');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const regions = [
    'Автономна Республіка Крим',
    'Вінницька область',
    'Волинська область',
    'Дніпровська область',
    'Донецька область',
    'Житомирська область',
    'Закарпатська область',
    'Запорізька область',
    'Івано-Франківська область',
    'Київська область',
    'Кіровоградська область',
    'Луганська область',
    'Львівська область',
    'Миколаївська область',
    'Одеська область',
    'Полтавська область',
    'Рівненська область',
    'Сумська область',
    'Тернопільська область',
    'Харківська область',
    'Херсонська область',
    'Хмельницька область',
    'Черкаська область',
    'Чернівецька область',
    'Чернігівська область',
  ];

  useEffect(() => {
    if (!response) return;
    const token = response.token;
    setCookie('token', token);
  }, [response]);

  const handleSubmit = event => {
    event.preventDefault();

    const url = isLoginPage ? '/user/login' : '/user/register';
    doFetch(url, {
      method: 'post',
      queryFields: {
        name, surname, birthday_date, gender,
        district_id, email, password, 
        status: -1
      }
    })
  }

  return (
    <div className = "py-5 container">
      <div className = "row">
        <div className = "col-md-10 offset-md-1 col-lg-6 offset-lg-3 text-center">
          <h1 className = "font-weight-light pt-3 pb-5">
            {signText}
          </h1>
          {error && (
            <div className = "mb-3">
              <span className = "text-danger font-weight-bold">
                {error}
              </span>
            </div>
          )}
          <form onSubmit = {handleSubmit}> 
            {!isLoginPage && (
              <Fragment>
                <div className = "form-group w-50 float-left pr-2">
                  <input 
                    className = "form-control form-control-lg"
                    type = "text"
                    placeholder = "Прізвище"  
                    onChange = {e => setSurname(e.target.value)}
                  />
                </div>
                <div className = "form-group w-50 float-left pl-2">
                  <input
                    className = "form-control form-control-lg"
                    type = "text"
                    placeholder = "Ім'я"
                    onChange = {e => setName(e.target.value)}
                  />
                </div>
                <div className = "form-group w-50 float-left pr-2">
                  <input 
                    type = "date" 
                    className = "form-control form-control-lg"
                    onChange = {e => setBirthday_date(e.target.value)}
                  />
                </div>
                <div className = "form-group w-50 float-left pl-2">
                  <select
                    className = "form-control form-control-lg"
                    onChange = {e => setGender(e.target.value)}
                    defaultValue = "male"
                  >
                    <option value = "male">Чоловіча</option>
                    <option value = "female">Жіноча</option>
                  </select>
                </div>
                <select 
                  className = "form-group form-control form-control-lg"
                  onChange = {e => setDistrict_id(e.target.value)}  
                  defaultValue = "0"
                >
                  {
                    regions.map((regionName, key) => (
                      <option value = {key} key = {key}>{regionName}</option>
                    ))
                  }
                </select>
              </Fragment>
            )}
            <input 
              className = "form-group form-control form-control-lg"
              type = "email"
              placeholder = "Email" 
              onChange = {e => setEmail(e.target.value)} 
            />
            <input 
              className = "form-group form-control form-control-lg"
              type = "password"
              placeholder = "Пароль"
              onChange = {e => setPassword(e.target.value)}
            />
            <button className = "btn btn-lg btn-warning btn-block text-white">
              {signText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}