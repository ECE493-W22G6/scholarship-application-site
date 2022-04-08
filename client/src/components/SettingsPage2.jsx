import React, { useState, useEffect } from 'react';
import { Component } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Divider, 
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem, 
  ListItemIcon, 
  ListSubheader, 
  ListItemText,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Assignment,
  Password, 
  Logout,
} from "@mui/icons-material";
import { withStyles } from '@mui/styles';

import NavBar from "./NavBar";
import { useUser } from "./UserInfo";

const theme = createTheme();

// Sode design inspired by Material UI: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-up/SignUp.js

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
};

const SettingsPage = () => {
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const { user, isLoading } = useUser(userId);
  const [listItem, selectListItem] = useState(1);
  
  const showListItem = async (integer) => {
    selectListItem(integer)
    // this.forceUpdate()
  };

  const handleChangePassword = (event) => {
    const data = new FormData(event.currentTarget);
    const oldPassword = data.get("old_password");
    const newPassword = data.get("new_password");
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

  const selectFile = (event) => {
    this.setState({
      ...this.state,
      previewImage: URL.createObjectURL(event.target.files[0]),
    });
  }

  const handleChangeProfile = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    if (!(firstName && lastName && email && password) &&
      (this.state.previewImage === undefined || this.state.previewImage === null)) {
      return;
    }

    const newIconUrl = this.state.previewImage
    const requestBody = {
      new_icon_url: newIconUrl,
    };

    axios.post(`/api/users/${userId}/icon/`, requestBody).then((resp) => {
      console.log(`recv'd resp: ${JSON.stringify(resp)}`);
      if (resp.status === 200) {
        console.log("Icon changed successfully");
      }
    });
    // Need to update whole profile
  };

  return (
    <div className="SettingsPage">
      <NavBar />
      <Container maxWidth="md">
      <CssBaseline />
      <Drawer 
        variant="persistent"
        anchor="left"
        open={true}
        display="flex"
      >
        <div>
        </div>
        <List>
          <div>
            <Box height={60}></Box>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                primary="Change Profile"
                onClick={(event) => {
                  showListItem(1)
                }}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Password />
              </ListItemIcon>
              <ListItemText
                primary="Change Password"
                onClick={(event) => {
                  showListItem(2)
                }}
              />
            </ListItem>
          </div>
        </List>
        {/* <List>
          <div>
            <ListSubheader inset>Others</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary="Other Information" />
            </ListItem>
          </div>
        </List> */}
      </Drawer>
      <main> 

        {listItem === 1 &&
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Update Profile
                </Typography>
                <Box
                  noValidate
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2} component="form" onSubmit={handleIconChange}>
                    {userType === "organization" && (
                      <Grid item xs={12}>
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
                            </Grid>
                          )}
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Verify Password"
                        type="password"
                        id="password"
                      />
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Update
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider> 
        }
        {listItem === 2 && 
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid container spacing={2} sx={{ p: 2 }} justifyContent="flex-end">
                  <Grid item xs={12} component="form" onSubmit={handleChangePassword}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="h5">Change password</Typography>
                      <hr />
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="old_password"
                          label="Current Password"
                          type="password"
                          id="old_password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="new_password"
                          label="Password"
                          type="password"
                          id="new_password"
                        />
                      </Grid>
                      <div align="center">
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update Password
                        </Button>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </ThemeProvider>
        }

      </main>
      </Container>
    </div>
  );
};

export default withStyles(styles)(SettingsPage);
