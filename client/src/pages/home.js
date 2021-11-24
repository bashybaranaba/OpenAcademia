import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

function Home() {
  const { state } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const likes = state ? state.likes : [];
  useEffect(() => {
    setLoading(true);
    const getPosts = () => {
      axios.get(`http://localhost:5000/getallposts`).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setPosts(res.data.posts);
          setLoading(false);
        }
      });
    };
    getPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <Container maxWidth="md">
        {!loading ? (
          posts &&
          posts.map((post) => <PostCard postData={post} userLikes={likes} />)
        ) : (
          <Grid align="center">
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default Home;
