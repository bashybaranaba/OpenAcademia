import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Chat(props) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const chatId = props.chatId;

  const onContentChange = (event) => {
    setContent(event.currentTarget.value);
  };

  const getConversation = () => {
    axios
      .get(`http://localhost:5000/getconversation/${chatId}`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setMessages(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { body: content };
    axios
      .post(`http://localhost:5000/sendmessage/${chatId}`, data)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setContent("");
        }
      });
    setContent("");
  };

  const deleteMessage = (message_id) => {
    axios
      .delete(`http://localhost:5000/deletemessage/${message_id}`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Message deleted");
          handleCloseMenu();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getConversation = () => {
      axios
        .get(`http://localhost:5000/getconversation/${chatId}`)
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            setMessages(res.data);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    };
    getConversation();
  }, [chatId]);
  useEffect(() => {
    if (props.open) {
      getConversation();
    }
  });

  return (
    <Box>
      <Box sx={{ margin: 2, display: "flex" }}>
        <Avatar src={`http://localhost:5000/${props.profile_img}`} />
        <Typography sx={{ margin: 1 }}>{props.username}</Typography>
      </Box>
      <Divider />
      {!loading ? (
        messages.length > 0 ? (
          <Box>
            {messages &&
              messages.map((message) =>
                message.sent_by._id === chatId ? (
                  <Box
                    sx={{
                      m: 4,
                      p: 2,
                      borderRadius: 4,
                      backgroundColor: "#e8eaf6",
                    }}
                  >
                    <Typography>{message.body}</Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      m: 4,
                      p: 2,
                      borderRadius: 4,
                      backgroundColor: "#bbdefb",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={11}>
                        <Typography>{message.body}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton onClick={handleOpenMenu}>
                          <KeyboardArrowDownIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={openMenu}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem onClick={() => deleteMessage(message._id)}>
                            <Typography
                              variant="caption"
                              sx={{ color: "#c62828" }}
                            >
                              Delete
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                  </Box>
                )
              )}
          </Box>
        ) : (
          <Grid align="center" sx={{ m: 5 }}>
            <Box>
              <Typography variant="caption">
                Start a conversion with User
              </Typography>
            </Box>
          </Grid>
        )
      ) : (
        <Grid align="center" sx={{ m: 2 }}>
          <Box>
            <CircularProgress />
          </Box>
          <Box>
            <Typography variant="caption">Loading chat...</Typography>
          </Box>
        </Grid>
      )}
      <Box>
        <Divider />
        <Box sx={{ display: "flex ", pl: 2, pt: 1 }}>
          <TextField
            sx={{ m: 1 }}
            fullWidth
            id="message"
            label="Type your message"
            multiline
            maxRows={4}
            variant="outlined"
            onChange={onContentChange}
            value={content}
          />
          <Tooltip placement="top" title="send">
            <IconButton
              sx={{ m: 2 }}
              size="large"
              color="inherit"
              onClick={handleSubmit}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

Chat.propTypes = {
  chatId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profile_img: PropTypes.string.isRequired,
  open: PropTypes.string.isRequired,
};

export default Chat;
