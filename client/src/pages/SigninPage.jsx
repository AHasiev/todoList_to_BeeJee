import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAuth } from "../redux/features/application";
import style from "./SignInUp.style.css"

const SigninPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");
  

  const signingIn = useSelector((state) => state.application.signingIn);
  const error = useSelector((state) => state.application.error);

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setpassword(e.target.value);
  };

 

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAuth({login, password}));
  };

 

  return (
    <form>

    <div className={style.body_123}>
      <div>{error}</div>
      <div>
        <input
          type="text"
          placeholder="type login"
          value={login}
          onChange={handleChangeLogin}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="type password"
          value={password}
          onChange={handleChangePassword}
        />
        
      </div>
      <button onClick={(e) => handleSubmit(e)} disabled={signingIn}>
        Войти
      </button>
    </div>
    </form>
    
  );
};

export default SigninPage;
