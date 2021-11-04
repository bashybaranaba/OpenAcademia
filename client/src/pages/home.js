import React from "react";
import Navbar from "../components/Navbar";

import PostCard from "../components/PostCard";

import Container from "@mui/material/Container";

function Home() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </Container>
    </div>
  );
}

export default Home;
