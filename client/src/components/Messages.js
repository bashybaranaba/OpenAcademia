import React, { Fragment, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";

function Messages() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        onClick={handleOpen}
        size="large"
        aria-label="show 4 new mails"
        color="inherit"
      >
        <Badge badgeContent={5} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 300, backGroundColor: "#fafafa" }}>
          <Box
            sx={{ display: "flex ", m: 2, bottom: 0, backGroundColor: "#fff" }}
          >
            <TextField sx={{ m: 1 }} fullWidth />
            <IconButton sx={{ m: 2 }} size="large" color="inherit">
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
}

export default Messages;
