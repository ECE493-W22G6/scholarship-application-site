
import * as React from "react";
import { Component } from "react";
import Button from "@mui/material/Button";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";


const theme = createTheme();

export default class UploadImages extends Component {
    state = {
        previewImage: undefined,
    };


    render() {
        const {
            previewImage,
        } = this.state;

        const selectFile = (event) => {
            this.setState({
                previewImage: URL.createObjectURL(event.target.files[0]),
            });
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const firstName = data.get("firstName");
            const lastName = data.get("lastName");
            const email = data.get("email");
            const password = data.get("password");
            console.log({
                first_name: data.get("firstName"),
                last_name: data.get("lastName"),
                email: data.get("email"),
                password: data.get("password"),
            });
            if (!(firstName && lastName && email && password)) {
                return;
            }
            // TODO: Axios command to verify if pass is correct otherwise give error response to display
            // axios
            //     .post("", {
            //         first_name: data.get("firstName"),
            //         last_name: data.get("lastName"),
            //         email: data.get("email"),
            //         password: data.get("password"),
            //     })
            //     .then((resp) => {
            //         console.log(`Got response: ${resp}`);
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
                        Update Profile
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className="mg20">
                                    <label htmlFor="btn-upload">
                                        <input
                                            id="btn-upload"
                                            name="btn-upload"
                                            style={{ display: "none" }}
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => selectFile(event)}
                                        />
                                        <Button className="btn-choose" variant="outlined" component="span">
                                            Choose Image
                                        </Button>
                                    </label>

                                    {previewImage && (
                                        <div>
                                            <img className="preview my20" src={previewImage} alt="" />
                                        </div>
                                    )}

                                </div>
                            </Grid>
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
}