import { Container } from "@mui/material";
import React from "react";
import NavBar from "./components/NavBar";
import UserInfo from "./components/UserInfo";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");

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
