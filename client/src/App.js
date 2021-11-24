import React, { createContext, useEffect, useReducer, useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import { reducer, initialState } from "./reducers/userReducer";

import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import Myprofile from "./pages/myprofile";
import userprofile from "./pages/userprofile";
import editpassword from "./pages/editpassword";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export const UserContext = createContext();

const theme = createTheme();
const Routing = () => {
  const { dispatch } = useContext(UserContext);
  const getUserData = () => {
    axios
      .get(`http://localhost:5000/user`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.IdToken;
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      getUserData();
      dispatch({ type: "USER", payload: user });
    } else {
      console.log("No auth");
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 10 }}>
        <Route exact path="/" component={home} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/login" component={login} />
        <Route exact path="/myprofile">
          <Myprofile />
        </Route>
        <Route exact path="/user/:username" component={userprofile} />
        <Route exact path="/editpassword" component={editpassword} />
      </Box>
    </ThemeProvider>
  );
};
function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
