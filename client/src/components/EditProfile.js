import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { UserContext } from "../App";

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
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function EditProfile(props) {
  const { username, first_name, last_name, bio, profile_img } =
    props.userDetails;

  const { dispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    profile_img ? profile_img : " "
  );
  const [newbio, setBio] = useState(bio ? bio : " ");
  const [newusername, setUsername] = useState(username);
  const [newfirstname, setFirstname] = useState(first_name);
  const [newlastname, setLastname] = useState(last_name);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("image", image);
    axios
      .post(`http://localhost:5000/uploadProfileImage`, formData, config)
      .then((response) => {
        if (response.data.success) {
          const newImage = response.data.image;
          console.log({ newImage });
          setProfileImage(newImage);
        } else {
          alert("Failed to save the Image in Server");
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      profile_img: profileImage,
      bio: newbio,
      username: newusername,
      first_name: newfirstname,
      last_name: newlastname,
    };

    axios.post(`http://localhost:5000/adduserdetails`, data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Profile Successfully updated");
        setOpen(false);
        dispatch({ type: "UPDATEUSER", payload: res.data.user });
      }
    });
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
          <Avatar
            sx={{ height: 120, width: 120 }}
            src={`http://localhost:5000/${profileImage}`}
          />
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            hidden
            onChange={handleImageChange}
          />
          <label htmlFor="imageInput">
            <Tooltip placement="top" title="Change Photo">
              <Fab
                component="span"
                color="primary"
                sx={{
                  radius: 5,
                  mt: -10,
                  ml: 10,
                }}
              >
                <PhotoCameraIcon />
              </Fab>
            </Tooltip>
          </label>

          <Box sx={{ m: 1 }}>
            <TextField
              sx={{ margin: 1 }}
              id="username"
              label="Username"
              variant="outlined"
              default="username"
              fullWidth
              value={newusername}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ margin: 1 }}
              id="bio"
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={newbio}
              onChange={(e) => setBio(e.target.value)}
            />
            <TextField
              sx={{ margin: 1 }}
              id="firstname"
              label="First Name"
              variant="outlined"
              fullWidth
              value={newfirstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              sx={{ margin: 1 }}
              id="lastname"
              label="Lastname"
              variant="outlined"
              fullWidth
              value={newlastname}
              onChange={(e) => setLastname(e.target.value)}
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

EditProfile.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

export default EditProfile;
