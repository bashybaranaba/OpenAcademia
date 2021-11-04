import React, { Fragment, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

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
        aria-label="new mails"
        color="inherit"
      >
        <Badge badgeContent={1} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ display: "flex", m: 1.5 }}>
          <Typography sx={{ m: 1 }}>Messages</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <Box sx={{ width: 350 }}>
          <Box sx={{ m: 4, p: 2, borderRadius: 4, backgroundColor: "#e8eaf6" }}>
            <Typography>Message from other User</Typography>
          </Box>
          <Box sx={{ m: 4, p: 2, borderRadius: 4, backgroundColor: "#bbdefb" }}>
            <Typography>Message sent by You</Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: 350,
            }}
          >
            <Divider />
            <Box sx={{ display: "flex ", pl: 2, pt: 1 }}>
              <TextField
                sx={{ m: 1 }}
                fullWidth
                id="mesage"
                label="Type your message"
                multiline
                maxRows={4}
                variant="outlined"
              />
              <Tooltip placement="top" title="send">
                <IconButton sx={{ m: 2 }} size="large" color="inherit">
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
}

export default Messages;
