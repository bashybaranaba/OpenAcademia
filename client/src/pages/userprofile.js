import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
function Userprofile(props) {
  const { state } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);

  const getUserData = (username) => {
    axios
      .get(`http://localhost:5000/user/${username}`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setUserDetails(res.data.user);
          setFollowers(res.data.user.followers);
          setPosts(res.data.posts);
        }
      })
      .catch((err) => console.log(err));
  };

  const userName = props.match.params.username;
  const likes = state ? state.likes : [];

  useEffect(() => {
    getUserData(userName);
  }, [userName]);

  return (
    <div>
      <Navbar />
      {userDetails === null ? (
        <p>Loading...</p>
      ) : (
        <Profile
          posts={posts}
          userDetails={userDetails}
          followers={followers}
          userLikes={likes}
        />
      )}
    </div>
  );
}

export default Userprofile;
