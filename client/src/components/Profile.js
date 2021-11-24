import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../App";

//Components
import PostCard from "./PostCard";
import EditProfile from "./EditProfile";
import Chat from "./Chat";

//MUI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import MailOutlineIcon from "@mui/icons-material/MailOutline";

function Profile(props) {
  const { dispatch, state } = useContext(UserContext);

  const { _id, username, profile_img, following, bio } = props.userDetails;
  const posts = props.posts;

  const likes = props.userLikes;
  const myfollows = state ? state.user.following : [];

  const [openChat, setOpenChat] = useState(false);
  const [followerCount, setFollowerCount] = useState(props.followers.length);

  const followUser = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/follow/${_id}`, {
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
          dispatch({ type: "FOLLOW", payload: _id });
          setFollowerCount(followerCount + 1);
        }
      });
  };

  const unFollowUser = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/unfollow/${_id}`, {
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
          alert("User Unfollowed");
          dispatch({ type: "UNFOLLOW", payload: _id });
          setFollowerCount(followerCount - 1);
        }
      });
  };

  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  const followed = () => {
    if (myfollows && myfollows.find((followeduser) => followeduser === _id))
      return true;
    else return false;
  };

  const followButton = (
    <Box>
      {followed() ? (
        <Button
          onClick={unFollowUser}
          variant="contained"
          sx={{ mb: 2, width: "30vh" }}
        >
          UnFollow
        </Button>
      ) : (
        <Button
          onClick={followUser}
          variant="contained"
          sx={{ mb: 2, width: "30vh" }}
        >
          Follow
        </Button>
      )}
    </Box>
  );

  const messageButton = (
    <Fragment>
      <Tooltip placement="bottom" title="Message">
        <Fab
          color="primary"
          onClick={handleOpenChat}
          sx={{
            height: 50,
            width: 50,
            mb: -6,
            ml: 14,
          }}
        >
          <MailOutlineIcon sx={{ color: "#fff" }} />
        </Fab>
      </Tooltip>
      <Dialog onClose={handleCloseChat} open={openChat} fullWidth maxWidth="sm">
        <Chat
          chatId={_id}
          username={username}
          profile_img={profile_img}
          open={openChat}
        />
      </Dialog>
    </Fragment>
  );

  return (
    <Container maxWidth="md">
      <br />
      <Grid align="center" sx={{ m: 2 }}>
        <Avatar
          src={`http://localhost:5000/${profile_img}`}
          sx={{ height: 120, width: 120, mb: -14 }}
        />
        {window.location.pathname !== "/myprofile" ? (
          messageButton
        ) : (
          <EditProfile userDetails={props.userDetails} />
        )}
        <Paper>
          <Box sx={{ display: "flex", m: 2 }} />
          <Box sx={{ mt: 10, mb: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="overline">
                  Posts: {posts && posts.length}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="overline">
                  Followers: {followerCount}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="overline">
                  Following: {following && following.length}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box sx={{ m: 4 }}>
            <Typography variant="h5" sx={{ m: 2 }}>
              {username}
            </Typography>

            <Typography sx={{ ml: 4, mr: 4 }}>{bio && bio}</Typography>
          </Box>
          {window.location.pathname !== "/myprofile" ? followButton : null}
          <Box sx={{ display: "flex", m: 2 }} />
        </Paper>
      </Grid>
      {posts &&
        posts.map((post) => <PostCard postData={post} userLikes={likes} />)}
    </Container>
  );
}

Profile.propTypes = {
  posts: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  userLikes: PropTypes.array.isRequired,
  followers: PropTypes.array.isRequired,
};

export default Profile;
