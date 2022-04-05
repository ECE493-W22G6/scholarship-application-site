import {
  Card,
  CircularProgress,
  Container,
  containerClasses,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import NavBar from "./NavBar";

const NotificationsPage = () => {
  const userId = localStorage.getItem("userId");
  const { notifications, isLoading } = getNotifications(userId);

  return (
    <React.Fragment>
      <NavBar />
      {isLoading && (
        <div align="center">
          <CircularProgress />
        </div>
      )}
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h4">Notifications</Typography>
          <hr />
          <Grid container spacing={2}>
            {notifications &&
              notifications.result.map((notif, index) => (
                <Grid key={`notification${index}`} item xs={12}>
                  <Card variant="outlined" sx={{ p: 1 }}>
                    <Typography variant="h7">{notif.message}</Typography>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Card>
      </Container>
    </React.Fragment>
  );
};

const getNotifications = (userId) => {
  const { data, error } = useSWR(`/api/notifications/user/${userId}/`, getter);
  console.log(data);

  return {
    notifications: data,
    isLoading: !data && !error,
    isError: error,
  };
};

const getter = (url) => axios.get(url).then((res) => res.data);

export default NotificationsPage;
