import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  CssBaseline,
} from "@mui/material";
import { GlobalStyles } from "@mui/styled-engine";

const NavBar = () => {
  const userId = localStorage.getItem("userId");
  const handleClick = (event) => {
    localStorage.clear();
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        {userId && (
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Scholarship Application Site
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="/scholarships"
                sx={{ my: 1, mx: 1.5 }}
              >
                All scholarships
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="/profile"
                sx={{ my: 1, mx: 1.5 }}
              >
                Profile
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="/settings"
                sx={{ my: 1, mx: 1.5 }}
              >
                Settings
              </Link>
            </nav>
            <Button
              href="/signin"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={handleClick}
            >
              Logout
            </Button>
          </Toolbar>
        )}
        {!userId && (
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Scholarship Application Site
            </Typography>
            <Button href="/signin" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Sign in
            </Button>
            <Button href="/signup" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Sign up
            </Button>
          </Toolbar>
        )}
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
