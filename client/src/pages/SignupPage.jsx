import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUsers } from "../redux/features/application";
import style from "./SignInUp.style.css";

const SignupPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");

  const signingUp = useSelector((state) => state.application.signingUp);
  const error = useSelector((state) => state.application.error);

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
  console.log(login, password );
    dispatch(createUsers({ login, password, email }));
  };

  return (
    <div className={style.content}>
      <div>{error}</div>
      <div>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={handleChangeLogin}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
        />        
      </div>
      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <button onClick={handleSubmit} disabled={signingUp}>
        Зарегистрироваться
      </button>
    </div>
  );
};

export default SignupPage;
