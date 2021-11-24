import React, { useContext } from "react";
import { UserContext } from "../App";
import Navbar from "../components/Navbar";

import Profile from "../components/Profile";

function Myprofile(props) {
  const { state } = useContext(UserContext);
  const userDetails = state ? state.user : {};
  const posts = state ? state.posts : [];
  const likes = state ? state.likes : {};
  const followers = state ? state.user.followers : [];
  return (
    <div>
      <Navbar />
      <Profile
        posts={posts}
        userDetails={userDetails}
        userLikes={likes}
        followers={followers}
      />
    </div>
  );
}

export default Myprofile;
