import React from "react";
import './user-profile.scss'

const UserProfile = ({profile}) => {
  const {firstName} = profile;

  return (
    <div className="user-profile">
      <h2>Hello {firstName}</h2>
    </div>
  )
};

export default UserProfile;
