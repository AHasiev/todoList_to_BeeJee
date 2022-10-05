import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, postTodos } from "../../redux/features/todos";
import "./Input.css";

const Input = () => {
  const todos = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addToDo = (e) => {
    e.preventDefault()
    if (text !== "") {
      dispatch(postTodos({text}));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch])


  return (
    <div className="input_conteiner">      
      <form>
      <input
        type="text"
        value={text}
        placeholder="Введите текст"
        onChange={(e) => {handleChange(e)}}
      ></input>
        <button onClick={(e) => addToDo(e)}>Добавить</button></form>
    </div>
  );
};

export default Input;
