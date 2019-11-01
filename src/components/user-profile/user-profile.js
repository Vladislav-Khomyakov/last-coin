import React from "react";

const UserProfile = ({profile}) => {
  const {firstName, lastName, email} = profile;

  return (
    <div>
      <h3>Здравствуйте, {firstName} {lastName}</h3>
      <span>Ваш Email: {email}</span>
    </div>
  )
};

export default UserProfile;
