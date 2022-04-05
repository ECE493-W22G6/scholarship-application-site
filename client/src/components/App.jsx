/* eslint-disable require-jsdoc */
import { Card, Container, Typography } from "@mui/material";
import React from "react";
import "./App.css";
import NavBar from "./NavBar";

function App() {
  const userId = sessionStorage.getItem("userId");
  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" className="App">
        <Card sx={{ my: 4, p: 2 }} variant="outlined">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Scholarship Application Site.
          </Typography>
          <Typography variant="h5">Hello, your userId is {userId}.</Typography>
        </Card>
      </Container>
    </div>
  );
}

export default App;
