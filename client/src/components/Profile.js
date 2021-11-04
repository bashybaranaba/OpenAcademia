import React from "react";

//Components
import PostCard from "./PostCard";
import EditProfile from "./EditProfile";

//MUI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Profile() {
  const followUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/follow/617052fac70e5def102fd970", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("IdToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("User Followed");
        }
      });
  };

  const followButton = (
    <Button onClick={followUser} variant="contained" sx={{ mb: -6, ml: 20 }}>
      Follow
    </Button>
  );
  return (
    <Container maxWidth="md">
      <Grid align="center" sx={{ m: 2 }}>
        <Avatar sx={{ height: 120, width: 120, mb: -14 }} />
        {window.location.pathname !== "/myprofile" ? (
          followButton
        ) : (
          <EditProfile />
        )}
        <Paper>
          <Box sx={{ display: "flex", m: 2 }} />
          <Box sx={{ mt: 10, mb: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="overline">Posts: 1</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="overline">Followers: 10</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="overline">Following: 10</Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box sx={{ m: 4 }}>
            <Typography variant="h5" sx={{ m: 2 }}>
              {window.location.pathname !== "/myprofile"
                ? "Username"
                : "MyProfile"}
            </Typography>
            <Typography sx={{ ml: 4, mr: 4 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", m: 2 }} />
        </Paper>
      </Grid>
      <PostCard />
    </Container>
  );
}

export default Profile;
