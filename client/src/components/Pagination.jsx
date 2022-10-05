import React from "react";
import style from "./Todos/Pagination.module.css"


export default function Pagination({ todosPerPage, totalTodo, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil((totalTodo / todosPerPage)); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className={style.pagination}>
        {pageNumbers.map((number) => {
          return (
            <li key={number} className={style.pageItem}>
              <span className="page-link" onClick={() => paginate(number)}>{number}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
