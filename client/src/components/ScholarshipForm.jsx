import { LocalizationProvider } from "@mui/lab";
import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import NavBar from "./NavBar";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import axios from "axios";

const ScholarshipForm = () => {
  const [endDate, setEndDate] = useState();
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const organizationId = sessionStorage.getItem("userId");
    const name = data.get("name");
    const amount = data.get("amount");
    const numberOfAwards = data.get("numberOfAwards");
    const description = data.get("description");
    const questions = data.get("questions");
    const weightings = data.get("weightings");
    const dataFields = {
      organization_id: organizationId,
      name,
      amount,
      number_of_awards: numberOfAwards,
      description,
      questions,
      weightings,
      end_date: endDate,
    };
    console.log(dataFields);
    if (
      !(
        name &&
        amount &&
        numberOfAwards &&
        description &&
        questions &&
        weightings &&
        endDate
      )
    ) {
      return;
    }
    axios
      .post("/api/scholarships/", dataFields)
      .then((resp) => {
        console.log(`recv'd resp: ${JSON.stringify(resp)}`);
        if (resp.status === 201) {
          //   setRedirect(true);
          console.log(JSON.stringify(resp));
          setAlertSuccess(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <React.Fragment>
      <NavBar />
      {alertSuccess && (
        <Alert severity="success">Scholarship successfully created!</Alert>
      )}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Typography variant="h6" gutterBottom>
              Create a new scholarship
            </Typography>
            <Grid container spacing={3} justifyContent="flex">
              <Grid item xs={6}>
                <TextField required id="name" name="name" label="Name" />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="DatePicker"
                    label="End date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField required id="amount" name="amount" label="Amount" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="numberOfAwards"
                  name="numberOfAwards"
                  label="Number of awards"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="questons"
                  name="questions"
                  label="Questions (separate with ';')"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="weightings"
                  name="weightings"
                  label="Weightings (in the format of: 'academic: x, leadership: y, volunteer: z') (Must sum to 100)"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid textAlign="right">
              <Button id="SubmitScholarship" type="submit" variant="contained" sx={{ mt: 3 }}>
                Submit
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default ScholarshipForm;
