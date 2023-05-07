import React from 'react';
import { useForm } from '../utils/hooks/useForm';

const Login = ({ onLogin }) => {

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <div className="sign">
      <p className="sign__title">
        Вход
      </p>
      <form onSubmit={handleLogin} className="sign__form">
        <input className='sign__input' required id="email" name="email" type="email" placeholder='Email' value={values.email} onChange={handleChange} />
        <input className='sign__input' required id="password" name="password" type="password" placeholder='Пароль' value={values.password} onChange={handleChange} />
        <button type="submit" className="sign__link">Войти</button>
      </form>
    </div>
  )
}

export default Login;