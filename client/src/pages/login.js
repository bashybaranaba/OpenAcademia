import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import LockIcon from "@mui/icons-material/Lock";

function Login() {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

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

    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("IdToken", `Bearer ${data.token}`);
          getUserData();
          dispatch({
            type: "USER",
            payload: JSON.parse(localStorage.getItem("user")),
          });
          alert("Success");
          history.push("/");
        }
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Card sx={{ margin: 6 }}>
        <Grid container spacing={2}>
          <Grid
            align="center"
            item
            xs={12}
            md={5}
            lg={5}
            sx={{
              display: { xs: "none", md: "block" },
              bgcolor: "primary.main",
            }}
          >
            <Avatar
              sx={{
                padding: 1,
                marginTop: 5,
                marginBottom: 2,
                bgcolor: "#fff",
              }}
            >
              <LockIcon sx={{ color: "primary.main" }} />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ margin: 1, color: "#fff" }}
            >
              Open Academia
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 4 }}>
              <Typography component="h1" variant="h5" sx={{ margin: 1 }}>
                Log In
              </Typography>
              <TextField
                sx={{ margin: 1 }}
                id="email"
                label="Email"
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{ margin: 1 }}
                id="password"
                type="password"
                label="Password"
                required
                variant="outlined"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ margin: 1 }}
              >
                Log In
              </Button>
              <Link
                href="/signup"
                variant="body2"
                color="primary"
                sx={{ margin: 1 }}
              >
                Don't have an account? Sign up
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Login;
