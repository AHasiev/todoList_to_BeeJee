import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  items: [],
  error: null,
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.error = action.payload;
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(postTodos.pending, (state, action) => {
        //action.meta.arg;
        state.loading = true;
      })
      .addCase(postTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.loading = false;
        state.error = null
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteTodos.pending, (state, action) => {
        //action.meta.arg;
        state.loading = true;
      })
      .addCase(patchTodos.fulfilled, (state, action) => {
        state.items = state.items.map((element) => {
          if (element._id === action.payload._id) {
            element.completed = !element.completed;
            return element;
          }
          return element;
        });
        state.loading = false
      })
      .addCase(patchTodos.pending, (state, action) => {
        //action.meta.arg;
        state.loading = true;
      })
      .addCase(patchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(patchTodosText.fulfilled, (state, action) => {
        state.items = state.items.map((element) => {
          if (element._id === action.payload._id) {
            element.text = action.payload.text;
            return element;
          }
          return element;
        });
        state.loading = false
      })
      .addCase(patchTodosText.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(patchTodosText.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default todos.reducer;

export const fetchTodos = createAsyncThunk(
  "fetchTodo",
  async (_, thunkApi) => {
    const state = thunkApi.getState()
    
    try {
      const response = await fetch("http://localhost:4000/toDo", {
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const data = await response.json();
     
      if (data.error) {
        return thunkApi.rejectWithValue(data.error);
      } else {
        return thunkApi.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postTodos = createAsyncThunk(
  "postTodos",
  async ({text}, thunkApi) => {
    const state = thunkApi.getState();
    const user = state.application.token && parseJwt(state.application.token)
    try {
      const res = await fetch("http://localhost:4000/toDo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, email: user && user.email }),
      });
      return res.json();
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    try {
      const res = await fetch(`http://localhost:4000/toDo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.application.token}`
        }
      });
      const data = await res.json()

      if (data.error) {
        return thunkApi.rejectWithValue(data.error)
      }
      return id;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const patchTodos = createAsyncThunk(
  "todos/patchTodos",
  async (todo, thunkApi) => {
    const state = thunkApi.getState();
    try {
      const res = await fetch(`http://localhost:4000/toDo/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });
      const data = await res.json();
      return data
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const patchTodosText = createAsyncThunk(
  "todos/patchTodosText",
  async ({todo, text}, thunkApi) => {
    const state = thunkApi.getState();
    try {
      const res = await fetch(`http://localhost:4000/toDoText/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`
        },
        body: JSON.stringify({
          text: text,
        }),
      });
      const data = await res.json();
      return data
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);