import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";

import Profile from "../components/Profile";

function Myprofile(props) {
  return (
    <div>
      <Navbar />
      <Profile
        posts={props.posts}
        userDetails={props.userDetails}
        userLikes={props.userLikes}
      />
    </div>
  );
}

Myprofile.propTypes = {
  posts: PropTypes.object.isRequired,
  useDetails: PropTypes.object.isRequired,
  userLikes: PropTypes.array.isRequired,
};

export default Myprofile;
