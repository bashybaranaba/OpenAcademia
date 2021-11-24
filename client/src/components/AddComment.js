import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function AddComment(props) {
  const [content, setContent] = useState("");

  const onContentChange = (event) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = props.postId;
    const data = { body: content };
    axios.post(`http://localhost:5000/comment/${id}`, data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        setContent("");
      }
    });
  };

  return (
    <Box sx={{ m: 1 }}>
      <TextField
        sx={{ m: 2 }}
        fullWidth
        id="content"
        label="Add a public comment"
        variant="standard"
        onChange={onContentChange}
        value={content}
      />
      <Button onClick={handleSubmit} sx={{ ml: 2 }} variant="contained">
        Submit Comment
      </Button>
    </Box>
  );
}

AddComment.propTypes = {
  postId: PropTypes.object.isRequired,
};

export default AddComment;
