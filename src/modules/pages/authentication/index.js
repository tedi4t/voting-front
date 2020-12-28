import React, { Fragment } from "react";

export default ({ location }) => {
  const isLoginPage = location.pathname === '/login';
  const signText = isLoginPage ? "Вхід" : "Реєстрація";

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
  ]

  return (
    <div className = "py-5 container">
      <div className = "row">
        <div className = "col-md-10 offset-md-1 col-lg-6 offset-lg-3 text-center">
          <h1 className = "font-weight-light pt-3 pb-5">
            {signText}
          </h1>
          <form>
            {!isLoginPage && (
              <Fragment>
                <div className = "form-group w-50 float-left pr-2">
                  <input 
                    className = "form-control form-control-lg"
                    type = "text"
                    placeholder = "Прізвище"  
                  />
                </div>
                <div className = "form-group w-50 float-left pl-2">
                  <input
                    className = "form-control form-control-lg"
                    type = "text"
                    placeholder = "Ім'я"  
                  />
                </div>
                <div className = "form-group w-50 float-left pr-2">
                  <input 
                    type = "date" 
                    className = "form-control form-control-lg"
                  />
                </div>
                <div className = "form-group w-50 float-left pl-2">
                  <select className = "form-control form-control-lg">
                    <option disabled>Виберіть стать</option>
                    <option value = "male">Чоловіча</option>
                    <option value = "female">Жіноча</option>
                  </select>
                </div>
                <select className = "form-group form-control form-control-lg">
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
            />
            <input 
              className = "form-group form-control form-control-lg"
              type = "password"
              placeholder = "Пароль"  
            />
            {!isLoginPage && (
              <input 
                className = "form-group form-control form-control-lg"
                type = "password"
                placeholder = "Повторіть пароль"  
              />
            )}
            <button className = "btn btn-lg btn-warning btn-block text-white">
              {signText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}