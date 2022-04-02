import { Container, GlobalStyles, Stack } from "@mui/material";
import React from "react";
// import {Link} from 'react-router-dom';
import "./App.css";
import NavBar from "./NavBar";
import ScholarshipList from "./ScholarshipList";
import UserInfo from "./UserInfo";

const Organization = () => {
  return (
    <div className="Organization">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <NavBar />
      <Container maxWidth="md">
        <Stack spacing={2}>
          <UserInfo userId="62463e3ebd256454fbdc71fb" />
          <ScholarshipList organization="62463e3ebd256454fbdc71fb" />
        </Stack>
      </Container>
    </div>
  );
};

export default Organization;
