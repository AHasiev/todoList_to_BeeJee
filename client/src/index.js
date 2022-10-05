import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ReactDOM from "react-dom/client";
import { store } from "./redux/configurStore";
import { Provider } from "react-redux"


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);
