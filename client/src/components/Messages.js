import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import Chat from "./Chat";

import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";

import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";

function Messages() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState(false);
  const [chats, setChats] = useState([]);

  const getChats = () => {
    axios
      .get(`http://localhost:5000/getchats`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setChats(res.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getChats();
    console.log(chats);
  }, [chats]);
  useEffect(() => {
    if (open) {
      getChats();
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
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
          {!loading ? (
            <Box>
              {chats &&
                chats.map((chat) => (
                  <Fragment>
                    <Box component={MenuItem} onClick={handleOpenChat}>
                      <Box sx={{ m: 1, display: "flex" }}>
                        <Avatar
                          src={`http://localhost:5000/${chat.profile_img}`}
                        />
                        <Typography sx={{ m: 1, ml: 2 }}>
                          {chat.username}
                        </Typography>
                      </Box>
                    </Box>
                    <Dialog
                      onClose={handleCloseChat}
                      open={openChat}
                      fullWidth
                      maxWidth="sm"
                    >
                      <Chat
                        chatId={chat._id}
                        username={chat.username}
                        profile_img={chat.profile_img}
                        open={openChat}
                      />
                    </Dialog>
                  </Fragment>
                ))}
            </Box>
          ) : (
            <Grid align="center" sx={{ m: 2 }}>
              <LinearProgress />
              <Typography variant="caption">Fetching messages..</Typography>
            </Grid>
          )}
        </Box>
      </Drawer>
    </Fragment>
  );
}

export default Messages;
