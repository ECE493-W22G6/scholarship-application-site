/* eslint-disable require-jsdoc */
import "./App.css";
import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" className="App" alignItems="center">
        <Box sx={{ my: 4 }}>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Scholarship Application Site
          </Typography>
          <nav className="App-header">
            <Link href="/organization">Organization</Link>
            <Link href="/submitscholarship">Submit a scholarship</Link>

            {/* <Link href="/student">Student</Link> */}
          </nav>
        </Box>
      </Container>
    </div>
  );
}

export default App;
