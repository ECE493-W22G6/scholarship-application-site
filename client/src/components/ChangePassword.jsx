// Code borrowed from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-up/SignUp.js

import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";

const theme = createTheme();

export default function SignUp() {
    const [userType, setUserType] = React.useState("");

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");
        const old_password = data.get("old_password");
        const new_password = data.get("new_password");
        const type = userType;
        console.log({
            first_name: data.get("firstName"),
            last_name: data.get("lastName"),
            email: data.get("email"),
            old_password: data.get("old_password"),
            new_password: data.get("new_password"),
            type: userType,
        });
        if (!(firstName && lastName && email && old_password && new_password && type)) {
            return;
        }
        // TODO: Axios command to verify old pass and change to new pass otherwise give error response to display
        // axios
        //     .post("/api/users/register/", {
        //         first_name: data.get("firstName"),
        //         last_name: data.get("lastName"),
        //         email: data.get("email"),
        //         password: data.get("password"),
        //         type: userType,
        //     })
        //     .then((resp) => {
        //         console.log(`recv'd resp: ${resp}`);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
    };

    return (
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
                        Update Password
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
