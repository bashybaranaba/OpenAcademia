import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import Myprofile from "./pages/myprofile";
import userprofile from "./pages/userprofile";
import editpassword from "./pages/editpassword";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const token = localStorage.IdToken;
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
} else {
  console.log("No auth");
}

function App(props) {
  const [userDetails, setUserDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  const getUserData = () => {
    axios
      .get(`http://localhost:5000/user`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setUserDetails(res.data.user);
          setPosts(res.data.posts);
          setLikes(res.data.likes);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserData();
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ mt: 10 }}>
          <Route exact path="/" component={home} />
          <Route exact path="/signup" component={signup} />
          <Route exact path="/login" component={login} />
          <Route exact path="/myprofile">
            <Myprofile
              posts={posts}
              userDetails={userDetails}
              userLikes={likes}
            />
          </Route>
          <Route exact path="/user/:username" component={userprofile} />
          <Route exact path="/editpassword" component={editpassword} />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
