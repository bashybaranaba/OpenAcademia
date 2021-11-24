import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import PropTypes from "prop-types";
import axios from "axios";

import PostDetails from "./PostDetails";
import AddComment from "./AddComment";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function PostCard(props) {
  const { dispatch, state } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const {
    posted_by: { username, profile_img },
    title,
    body,
    like_count,
    _id,
  } = props.postData;

  const [likeCount, setLikeCount] = useState(like_count);
  const likes = state ? state.likes : [];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  };

  const handleCloseCommentDialog = () => {
    setOpenCommentDialog(false);
  };

  const handleLike = () => {
    axios
      .get(`http://localhost:5000/like/${_id}`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          dispatch({ type: "LIKE", payload: res.data.like });
          setLikeCount(likeCount + 1);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleUnLike = () => {
    axios
      .get(`http://localhost:5000/unlike/${_id}`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          dispatch({ type: "UNLIKE", payload: res.data._id });
          setLikeCount(likeCount - 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/deletepost/${_id}`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          dispatch({ type: "DELETEPOST", payload: _id });
          alert("Post Deleted");
          handleCloseDeleteDialog();
        }
      })
      .catch((err) => console.log(err));
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

      <Typography sx={{ mt: 1 }}>{likeCount}</Typography>
    </Box>
  );

  const commentButton = (
    <Fragment>
      <Box sx={{ margin: 1, display: "flex" }}>
        <Tooltip placement="top" title="comment">
          <IconButton onClick={handleOpenCommentDialog}>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        onClose={handleCloseCommentDialog}
        open={openCommentDialog}
        fullWidth
        maxWidth="md"
      >
        {" "}
        <DialogTitle>Post a public Comment</DialogTitle>
        <DialogContent>
          <AddComment postId={_id} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );

  const deleteButton = (
    <Fragment>
      <Box sx={{ margin: 1, display: "flex" }}>
        <Tooltip placement="top" title="delete post">
          <IconButton onClick={handleOpenDeleteDialog}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        onClose={handleCloseDeleteDialog}
        open={openDeleteDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
          <Button
            variant="contained"
            onClick={handleCloseDeleteDialog}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ mt: 2, ml: 2 }}
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );

  return (
    <Card sx={{ margin: 2 }}>
      <Box sx={{ margin: 2, display: "flex" }}>
        <Avatar src={`http://localhost:5000/${profile_img}`} />
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
        {window.location.pathname !== "/myprofile" ? null : deleteButton}
      </Box>
    </Card>
  );
}

PostCard.propTypes = {
  postData: PropTypes.object.isRequired,
  userLikes: PropTypes.array.isRequired,
};

export default PostCard;
