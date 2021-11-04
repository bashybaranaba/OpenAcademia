import React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function PostDetails() {
  return (
    <Box>
      <Box sx={{ margin: 2, display: "flex" }}>
        <Avatar />
        <Typography sx={{ margin: 1 }}>Username</Typography>
      </Box>
      <Divider />
      <Box sx={{ margin: 3 }}>
        <Typography variant="h5" component="h1" sx={{ margin: 1 }}>
          Title
        </Typography>
        <Typography variant="body1" sx={{ margin: 1 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>

      <Box sx={{ margin: 3 }}>
        <Typography variant="h5" component="h1" sx={{ margin: 1 }}>
          Comments
        </Typography>

        <TextField
          sx={{ m: 2 }}
          fullWidth
          label="Add a public comment"
          variant="standard"
        />
        <Button sx={{ ml: 2 }} variant="contained">
          Submit Comment
        </Button>

        <Box sx={{ margin: 3 }}>
          <Box sx={{ margin: 1, display: "flex" }}>
            <Avatar />
            <Typography sx={{ margin: 1 }}>Username</Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ ml: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ margin: 3 }}>
          <Box sx={{ margin: 1, display: "flex" }}>
            <Avatar />
            <Typography sx={{ margin: 1 }}>Username</Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ ml: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PostDetails;
