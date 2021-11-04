import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import myprofile from "./pages/myprofile";
import userprofile from "./pages/userprofile";
import editpassword from "./pages/editpassword";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ mt: 10 }}>
          <Route exact path="/" component={home} />
          <Route exact path="/signup" component={signup} />
          <Route exact path="/login" component={login} />
          <Route exact path="/myprofile" component={myprofile} />
          <Route exact path="/otheruser" component={userprofile} />
          <Route exact path="/editpassword" component={editpassword} />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
