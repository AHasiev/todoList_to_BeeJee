import React from "react";
import { Link } from "react-router-dom";
import style from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from '../../redux/features/application'

const Header = () => {
  const token = useSelector((state) => state.application.token);
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeToken());
  };


  return (
    <>
    {token && <button className={style.exit}  onClick={handleRemove}>Выйти</button>}
      <header className={style.head}>
        <Link to="/">HomePage</Link>
        <Link to="/signinPage">SigninPage</Link>
        <Link to="/signupPage">SignupPage</Link>
      </header>
      
    </>
  );
};

export default Header;
