import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import TagIcon from "@mui/icons-material/Tag";

function AppMenu() {
  const [open, setOpen] = useState(true);

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
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        variant="persistent"
      >
        <Box sx={{ display: "flex", m: 1.5, color: "#1565c0" }}>
          <Typography sx={{ m: 1, ml: 4 }}>Open Academia</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ width: 230 }}>
          {["Home", "About", "Topics", "Support"].map((text, index) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={
                index === 0 ? "/" : index === 1 ? "/" : index === 2 ? "/" : "/"
              }
            >
              <ListItemIcon sx={{ color: "#263238" }}>
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <InfoIcon />
                ) : index === 2 ? (
                  <TagIcon />
                ) : (
                  <HelpIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  );
}

export default AppMenu;
