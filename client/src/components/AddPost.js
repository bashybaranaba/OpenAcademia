import React, { Fragment, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";

function AddPost() {
  const { dispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title: title, body: content };
    axios.post(`http://localhost:5000/createpost`, data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Post successfully addded");
        setOpen(false);
        dispatch({ type: "ADDPOST", payload: res.data.post });
      }
    });
  };
  return (
    <Fragment>
      <Tooltip placement="top" title="create post">
        <IconButton onClick={handleOpen}>
          <AddIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <Box sx={{ m: 1 }}>
            <TextField
              sx={{ margin: 1 }}
              id="title"
              label="Title"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ margin: 1 }}
              id="content"
              label="Content"
              variant="outlined"
              required
              multiline
              rows={4}
              fullWidth
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              sx={{ margin: 1 }}
              onClick={handleSubmit}
              variant="contained"
              fullWidth
            >
              Post
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AddPost;
