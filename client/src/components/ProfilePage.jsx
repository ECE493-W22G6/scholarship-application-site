import { Container } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import UserInfo from "./UserInfo";

const ProfilePage = () => {
  const userId = sessionStorage.getItem("userId");

  return (
    <div className="ProfilePage">
      <NavBar />
      <Container maxWidth="md" sx={{ m: 2 }}>
        <UserInfo userId={userId} />
      </Container>
    </div>
  );
};

export default ProfilePage;
