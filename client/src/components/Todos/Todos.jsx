import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
} from "../../redux/features/todos";
import Pagination from "../Pagination";
import Todo from "./Todo/Todo";
import style from "./Todos.module.css";

const Todos = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");

  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);
  const todos = useSelector((state) => state.todos.items);
  const token = useSelector((state) => state.application.token);


  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(3);

  const lastPageIndex = currentPage * todosPerPage;
  const firstPageIndex = lastPageIndex - todosPerPage;
  const currentTodo = todos.slice(firstPageIndex, lastPageIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  console.log(todos);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const collatore = new Intl.Collator("en-EN");

  const sortUser = () => {
    switch (sort) {
      case "status":
        return currentTodo
          .slice()
          .sort((a, b) => collatore.compare(a.completed, b.completed));
      case "name":
        return currentTodo
          .slice()
          .sort((a, b) => collatore.compare(a.user.login, b.user.login));
      case "email":
        return currentTodo
          .slice()
          .sort((a, b) => collatore.compare(a.email, b.email));
      default:
        return currentTodo;
    }
  };

  
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const role = token && parseJwt(token).role
const userId = token && parseJwt(token).id

console.log(role)
  
  return (
    <>
      <div>
        <div>
          <div className={style.sortBtn}>
            <button className={style.btnLeftCard} onClick={() => setSort("status")}>
              По статусу{" "}
            </button>

            <button className={style.btnLeftCard} onClick={() => setSort("name")}>
              По имени{" "}
            </button>
            <button className={style.btnLeftCard} onClick={() => setSort("email")}>
              По email{" "}
            </button>
          </div>

          <div>
            {sortUser().map((todo) => {
              return (
               <Todo todo={todo} role={role} userId={userId}/>
              )
            })}
          </div>
        </div>
      </div>
      <Pagination
        todosPerPage={todosPerPage}
        totalTodo={todos.length}
        paginate={paginate}
      />
      <button className="btn btn-primary" onClick={prevPage}>
        Prev Page
      </button>
      <button className="btn btn-primary ms-2" onClick={nextPage}>
        Next Page
      </button>
    </>
  );
};

export default Todos;
