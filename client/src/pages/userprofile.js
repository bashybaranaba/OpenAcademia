import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
function Userprofile(props) {
  const [userDetails, setUserDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  const getUserData = (username) => {
    axios
      .get(`http://localhost:5000/user/${username}`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setUserDetails(res.data.user);
          setPosts(res.data.posts);
          setLikes(res.data.likes);
        }
      })
      .catch((err) => console.log(err));
  };

  const userName = props.match.params.username;

  useEffect(() => {
    getUserData(userName);
  }, []);
  useEffect(() => {
    getUserData(userName);
  });

  return (
    <div>
      <Navbar />
      {userDetails === null ? (
        <p>Loading...</p>
      ) : (
        <Profile posts={posts} userDetails={userDetails} userLikes={likes} />
      )}
    </div>
  );
}

export default Userprofile;
