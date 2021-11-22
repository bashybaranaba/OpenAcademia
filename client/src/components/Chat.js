import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import SendIcon from "@mui/icons-material/Send";

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const chatId = props.chatId;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { body: content };
    axios
      .post(`http://localhost:5000/sendmessage/${chatId}`, data)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Message sent successfully");
          setContent("");
        }
      });
  };

  useEffect(() => {
    getConversation();
    console.log(messages);
  }, []);
  useEffect(() => {
    getConversation();
  });

  return (
    <Box>
      <Box sx={{ margin: 2, display: "flex" }}>
        <Avatar />
        <Typography sx={{ margin: 1 }}>User</Typography>
      </Box>
      <Divider />
      <Box>
        {messages &&
          messages.map((message) =>
            message.sent_by._id === chatId ? (
              <Box
                sx={{ m: 4, p: 2, borderRadius: 4, backgroundColor: "#e8eaf6" }}
              >
                <Typography>{message.body}</Typography>
              </Box>
            ) : (
              <Box
                sx={{ m: 4, p: 2, borderRadius: 4, backgroundColor: "#bbdefb" }}
              >
                <Typography>{message.body}</Typography>
              </Box>
            )
          )}
      </Box>
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
            onChange={(e) => setContent(e.target.value)}
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
};

export default Chat;
