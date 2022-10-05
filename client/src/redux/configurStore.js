import { configureStore } from "@reduxjs/toolkit";
import application from "./features/application";
import todos from "./features/todos";

export const store = configureStore ({
  reducer: {
    todos: todos,
    application: application,
  }
})
