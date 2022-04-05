import {
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import useSWR from "swr";

const UserInfo = ({ userId }) => {
  // const userId = sessionStorage.getItem("userId");
  // const {user, isLoading} = useUser('62463e3ebd256454fbdc71fb);
  const { user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div align="center">
        <CircularProgress />
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
        {user && user.icon_url && (
          <Grid item>
            <Avatar src={user.icon_url} alt={user.first_name} />
          </Grid>
        )}
        <Grid item>
          <Typography variant="h4" align="center">
            {user.first_name + " " + user.last_name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <strong>Email: {user.email}</strong>
        </Grid>
        <Grid item xs={12}>
          <strong>Account Type: {user.type}</strong>
        </Grid>
        {user.description && (
          <Grid item xs={12}>
            <p>{user.description}</p>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

UserInfo.propTypes = {
  userId: PropTypes.string,
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

export default UserInfo;

export { useUser };
