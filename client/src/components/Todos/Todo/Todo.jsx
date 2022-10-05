import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodos,
  patchTodos,
  patchTodosText,
} from "../../../redux/features/todos";
import style from "../Todos.module.css";

export default function Todo({ todo, role, userId }) {
  const [text, setText] = useState(" ");
  const [read, setRead] = useState(true);

  const changeText = (e) => {
    setText(e.target.value);
  };
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodos(id));
  };

  const changeToDo = (todo) => {
    if (todo.user._id === userId || role === "admin") {
      dispatch(patchTodos(todo));
      return;
    }
    alert("нет доступа");
    console.log(todo);
  };

  const saveText = () => {
    dispatch(patchTodosText({ todo, text }));
  };

  return (
    <div className={style.todo}>
      <div className="completed_button">
        <button
          className={todo.completed ? style.selected : style.s2}
          onClick={() => changeToDo(todo)}
        >
          ★
        </button>
      </div>
      <div className={style.mainInfo}>
        <div className={style.infoUser}>
          <div>{todo.user && todo.user.login}</div>
          <div>{todo.email !== null && todo.email}</div>
        </div>
        <input
          // defaultValue={todo.text}
          readOnly={read}
          onChange={(e) => changeText(e)}
          value={text !== " " ? text : todo.text}
        />
        {role === "admin" && (
          <>
            <button onClick={() => setRead(false)}>Редактировать</button>
            <button onClick={() => saveText()}>Сохранить</button>
          </>
        )}
      </div>
      {todo.user && (todo.user._id === userId || role === "admin") && (
        <div className="delete_button">
          <button onClick={() => handleDelete(todo._id)}>X</button>
        </div>
      )}
    </div>
  );
}
