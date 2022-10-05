import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  singingUp: false,
  singingIn: false,
  error: null,
  token: localStorage.getItem("token"),
};

export const addLogPass = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUsers.pending, (state, action) => {
        state.singingUp = true;
        state.error = null;
        // state.token = action.payload.token;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.singingUp = true;
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.singingUp = true;
      })
      .addCase(createAuth.pending, (state, action) => {
        state.singingIn = true;
        state.error = null;
      })
      .addCase(createAuth.fulfilled, (state, action) => {
        state.singingIn = false;
        state.token = action.payload.token;
      })
      .addCase(createAuth.rejected, (state, action) => {
        state.singingIn = false;
        state.error = action.payload;
      })
      .addCase(removeToken.fulfilled, (state, action) => {
        state.token = null;
      });
  },
});

export default addLogPass.reducer;

export const createUsers = createAsyncThunk(
  "createUser",
  async ({ login, password, email }, thunkApi) => {
    try {
      const res = await fetch("/users", {
        method: "POST",
        body: JSON.stringify({ login, password, email }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
console.log(data)
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

export const createAuth = createAsyncThunk(
  "auth",
  async ({ login, password }, thunkApi) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        return thunkApi.rejectWithValue(data.error);
      } else {
        localStorage.setItem("token", data.token);
        return thunkApi.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const removeToken = createAsyncThunk("remove", async (_, thunkApi) => {
  localStorage.removeItem("token");
});
