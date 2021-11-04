import React, { Fragment, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

import EditIcon from "@mui/icons-material/Edit";

function EditProfile() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Tooltip placement="bottom" title="Edit Profile">
        <Fab
          onClick={handleOpen}
          color="primary"
          sx={{
            height: 50,
            width: 50,
            mb: -6,
            ml: 14,
          }}
        >
          <EditIcon sx={{ color: "#fff" }} />
        </Fab>
      </Tooltip>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent align="center">
          <Avatar sx={{ height: 120, width: 120 }} />
          <Tooltip placement="top" title="Change Photo">
            <Fab
              onClick={handleOpen}
              color="primary"
              sx={{
                height: 50,
                width: 50,
                mt: -10,
                ml: 10,
              }}
            >
              <EditIcon sx={{ color: "#fff" }} />
            </Fab>
          </Tooltip>
          <Box sx={{ m: 1 }}>
            <TextField
              sx={{ margin: 1 }}
              id="bio"
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              sx={{ margin: 1 }}
              id="email"
              label="Email"
              variant="outlined"
              default="example@email.com"
              fullWidth
            />
            <TextField
              sx={{ margin: 1 }}
              id="username"
              label="Username"
              variant="outlined"
              default="username"
              fullWidth
            />

            <Button
              sx={{ margin: 1 }}
              onClick={handleSubmit}
              variant="contained"
              fullWidth
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default EditProfile;
