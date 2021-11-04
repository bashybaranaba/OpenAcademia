import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function PostCard() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const likeButton = (
    <Box sx={{ margin: 1, display: "flex" }}>
      <Tooltip placement="top" title="like">
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </Tooltip>
      <Typography sx={{ mt: 1 }}>123</Typography>
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
        <Typography sx={{ margin: 1 }} component={Link} to="/otheruser">
          Username
        </Typography>
      </Box>
      <Divider />
      <CardActionArea onClick={handleOpen}>
        <Box sx={{ margin: 3 }}>
          <Typography variant="h5" component="h1" sx={{ margin: 1 }}>
            Title
          </Typography>
          <Typography variant="body1" sx={{ margin: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
      </CardActionArea>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
        <PostDetails />
      </Dialog>
      <Box sx={{ margin: 2, display: "flex" }}>
        {likeButton}
        {commentButton}
      </Box>
    </Card>
  );
}

export default PostCard;
