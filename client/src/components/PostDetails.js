import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//Components
import AddComment from "./AddComment";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function PostDetails(props) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const getPostData = () => {
    const id = props.postId;
    axios.get(`http://localhost:5000/post/${id}`).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        setPost(res.data.post);
        setComments(res.data.comments);
      }
    });
  };

  useEffect(() => {
    getPostData();
  }, []);
  useEffect(() => {
    getPostData();
  });

  return (
    <Box>
      <Box sx={{ margin: 2, display: "flex" }}>
        <Avatar />
        <Typography sx={{ margin: 1 }}>Username</Typography>
      </Box>
      <Divider />
      <Box sx={{ margin: 3 }}>
        <Typography variant="h5" component="h1" sx={{ margin: 1 }}>
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ margin: 1 }}>
          {post.body}
        </Typography>
      </Box>

      <Box sx={{ margin: 3 }}>
        <Typography variant="h5" component="h1" sx={{ margin: 1 }}>
          Comments
        </Typography>
        <AddComment postId={props.postId} />

        {comments &&
          comments.map((comment) => (
            <Box>
              <Box sx={{ margin: 3 }}>
                <Box sx={{ margin: 1, display: "flex" }}>
                  <Avatar />
                  <Typography sx={{ margin: 1 }}>
                    {comment.comment_by.username}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  {comment.body}
                </Typography>
              </Box>
              <Divider />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

PostDetails.propTypes = {
  postId: PropTypes.object.isRequired,
};

export default PostDetails;
