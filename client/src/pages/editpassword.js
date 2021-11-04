import React from "react";

import Navbar from "../components/Navbar";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Editpassword() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <TextField
          id="oldpassword"
          label="Old password"
          sx={{ m: 2 }}
          fullWidth
        />
        <TextField
          id="newpassword"
          label="New password"
          sx={{ m: 2 }}
          fullWidth
        />
        <Button variant="contained" sx={{ m: 2 }} fullWidth>
          Change password
        </Button>
      </Container>
    </div>
  );
}

export default Editpassword;
