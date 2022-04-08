import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";
import axios from "axios";
import React from "react";
import NavBar from "./NavBar";
import { useUser } from "./UserInfo";

const styles = {
  root: {
    display: "flex",
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    height: "100vh",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
  },
  drawerPaperClose: {
    overflowX: "hidden",
  },
};

const SettingsPage2 = () => {
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const { user, isLoading } = useUser(userId);

  const handleChangePassword = (event) => {
    const data = new FormData(event.currentTarget);
    const oldPassword = data.get("old-password");
    const newPassword = data.get("new-password");
    const requestBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    console.log(requestBody);

    axios.post(`/api/users/${userId}/password/`, requestBody).then((resp) => {
      console.log(`recv'd resp: ${JSON.stringify(resp)}`);
      if (resp.status === 200) {
        console.log("Password changed successfully");
      }
    });
  };

  const handleIconChange = (event) => {
    const data = new FormData(event.currentTarget);
    const newIconUrl = data.get("new-icon-url");
    const requestBody = {
      new_icon_url: newIconUrl,
    };

    axios.post(`/api/users/${userId}/icon/`, requestBody).then((resp) => {
      console.log(`recv'd resp: ${JSON.stringify(resp)}`);
      if (resp.status === 200) {
        console.log("Icon changed successfully");
      }
    });
  };

  return (
    <div className="SettingsPage">
      <NavBar />
      <Container maxWidth="md">
        <Grid container spacing={2} sx={{ p: 2 }} justifyContent="flex-end">
          <Grid item xs={12} component="form" onSubmit={handleChangePassword}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h5">Change password</Typography>
              <hr />
              <Grid item sx={{ m: 2 }}>
                <TextField
                  required
                  fullWidth
                  name="old-password"
                  id="old-password"
                  label="Old password"
                  autoComplete="password"
                  type="password"
                />
              </Grid>
              <Grid item sx={{ m: 2 }}>
                <TextField
                  required
                  fullWidth
                  name="new-password"
                  id="new-password"
                  label="New password"
                  autoComplete="password"
                  type="password"
                />
              </Grid>
              <div align="center">
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
              </div>
            </Card>
          </Grid>
          {userType === "organization" && (
            <Grid item xs={12} component="form" onSubmit={handleIconChange}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5">Change icon</Typography>
                <hr />
                {isLoading && (
                  <div align="center">
                    <CircularProgress />
                  </div>
                )}
                {user && (
                  <Grid item sx={{ m: 2 }}>
                    <Avatar src={user.icon_url} />
                    <TextField
                      required
                      fullWidth
                      name="new-icon-url"
                      id="new-icon-url"
                      label="New icon url"
                      sx={{ mt: 2 }}
                    />
                    <div align="center">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Grid>
                )}
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default withStyles(styles)(SettingsPage2);
