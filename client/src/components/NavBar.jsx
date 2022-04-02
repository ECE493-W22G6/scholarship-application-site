import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";

const NavBar = () => {
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          {/* content */}
          <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Scholarship Application Site
          </Typography>
          <nav align="right">
            <Link
              variant="button"
              color="text.primary"
              href="/scholarshipList"
              sx={{ my: 1, mx: 1.5 }}
            >
              All scholarships
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/notifications"
              sx={{ my: 1, mx: 1.5 }}
            >
              Notifications
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
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
