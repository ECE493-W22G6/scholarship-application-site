import {
  Avatar,
  CircularProgress,
  Container,
  GlobalStyles,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
// import {Button, Card, Row, Preloader, Col} from 'react-materialize';
import axios from "axios";
import React from "react";
import useSWR from "swr";
// import {Link} from 'react-router-dom';
import "./App.css";
import ScholarshipList from "./ScholarshipList";
import NavBar from "./NavBar";

const Organization = () => {
  return (
    <div className="Organization">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <NavBar />
      <Container maxWidth="md">
        <Stack spacing={2}>
          <Info />
          <ScholarshipList organization="62463e3ebd256454fbdc71fb" />
        </Stack>
      </Container>
    </div>
  );
};

const Info = () => {
  const userId = localStorage.getItem("userId");
  // const {user, isLoading} = useUser('62463e3ebd256454fbdc71fb);
  const { user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div align="center">
        <CircularProgress active />
      </div>
    );
  }

  return (
    <Paper
      variant="outlined"
      maxWidth="sm"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
        padding: 3,
      }}
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={4}>
          <Avatar src={user.icon_url} alt={user.first_name} />
        </Grid>
        <Grid item xs={8}>
          <h1 align="center">{user.first_name}</h1>
        </Grid>
        <Grid item xs={12}>
          <p>{user.description}</p>
        </Grid>
      </Grid>
    </Paper>
  );
};

function useUser(id) {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default Organization;
