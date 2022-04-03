import { Container, GlobalStyles, Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
// import {Link} from 'react-router-dom';
import "./App.css";
import NavBar from "./NavBar";
import ScholarshipList from "./ScholarshipList";
import UserInfo from "./UserInfo";

const OrganizationPage = () => {
  const params = useParams();
  return (
    <div className="OrganizationPage">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <NavBar />
      <Container maxWidth="md">
        <Stack spacing={2}>
          <UserInfo userId={params.organizationId} />
          <ScholarshipList organization={params.organizationId} />
        </Stack>
      </Container>
    </div>
  );
};

export default OrganizationPage;
