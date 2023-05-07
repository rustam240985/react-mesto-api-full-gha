import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../utils/hooks/useForm';

const Register = ({ onRegister }) => {

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <div className="sign">
      <p className="sign__title">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="sign__form">
        <input className='sign__input' id="email" name="email" type="email" placeholder='Email' value={values.email} onChange={handleChange} />
        <input className='sign__input' id="password" name="password" type="password" placeholder='Пароль' value={values.password} onChange={handleChange} />
        <button type="submit" className="sign__link">Зарегистрироваться</button>
      </form>
      <div className="sign__sign-in">
        <span>Уже зарегистрированы? </span>
        <Link className="sign__login-link" to="/sign-in">Войти</Link>
      </div>
    </div>
  );
}

export default Register;