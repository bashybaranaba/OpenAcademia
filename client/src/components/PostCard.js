import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import PostDetails from "./PostDetails";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function PostCard(props) {
  const [open, setOpen] = useState(false);

  const {
    posted_by: { username, profile_img },
    title,
    body,
    files,
    like_count,
    _id,
  } = props.postData;
  const likes = props.userLikes;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLike = () => {
    axios.get(`http://localhost:5000/like/${_id}`);
  };
  const handleUnLike = () => {
    axios.get(`http://localhost:5000/unlike/${_id}`);
  };

  const liked = () => {
    if (likes && likes.find((like) => like.liked_post === _id)) return true;
    else return false;
  };

  const likeButton = (
    <Box sx={{ margin: 1, display: "flex" }}>
      {liked() ? (
        <Tooltip placement="top" title="unlike">
          <IconButton onClick={handleUnLike}>
            <FavoriteIcon sx={{ color: "#e91e63" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip placement="top" title="like">
          <IconButton onClick={handleLike}>
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
      )}

      <Typography sx={{ mt: 1 }}>{like_count && like_count}</Typography>
    </Box>
  );

  const commentButton = (
    <Box sx={{ margin: 1, display: "flex" }}>
      <Tooltip placement="top" title="comment">
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Typography sx={{ mt: 1 }}>2</Typography>
    </Box>
  );

  return (
    <Card sx={{ margin: 2 }}>
      <Box sx={{ margin: 2, display: "flex" }}>
        <Avatar />
        <Typography
          sx={{ margin: 1 }}
          component={Link}
          to={`/user/${username}`}
        >
          {username}
        </Typography>
      </Box>
      <Divider />
      <CardActionArea onClick={handleOpen}>
        <Box sx={{ margin: 3 }}>
          <Typography variant="h5" component="h1" sx={{ margin: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ margin: 1 }}>
            {body}
          </Typography>
        </Box>
      </CardActionArea>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
        <PostDetails postId={_id} />
      </Dialog>
      <Box sx={{ margin: 2, display: "flex" }}>
        {likeButton}
        {commentButton}
      </Box>
    </Card>
  );
}

PostCard.propTypes = {
  postData: PropTypes.object.isRequired,
  userLikes: PropTypes.array.isRequired,
};

export default PostCard;
