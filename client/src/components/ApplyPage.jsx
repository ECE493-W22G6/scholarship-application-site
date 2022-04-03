import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router";
import NavBar from "./NavBar";
import { getScholarshipInfo, ScholarshipInfo } from "./ScholarshipPage";

const ApplyPage = () => {
  const params = useParams();
  const { scholarship, isLoading } = getScholarshipInfo(params.scholarshipId);
  const [grade, setGrade] = useState(6);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const phone = data.get("phone");
    const address1 = data.get("address1");
    const address2 = data.get("address2");
    const school = data.get("school");
    const questionAnswers = scholarship.questions.map((_, i) =>
      data.get(`question${i}`)
    );
    const application = {
      user_id: localStorage.getItem("userId"),
      scholarship_id: params.scholarshipId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      grade,
      address: `${address1}, ${address2}`,
      school,
      answers: questionAnswers,
    };
    console.log(application);
    if (!(firstName && lastName && email && school)) {
      return;
    }
    // setisLoading(true);
    axios
      .post("/api/applications/", application)
      .then((resp) => {
        console.log(`recv'd resp: ${JSON.stringify(resp)}`);
        if (resp.status === 200) {
          console.log("Application successfully received");
          setRedirect(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="ApplyPage">
      {redirect && <Navigate to={`/scholarships/${params.scholarshipId}`} />}
      <NavBar />
      <Container maxWidth="md">
        <Card elevation={3} sx={{ mb: 5 }}>
          <ScholarshipInfo scholarshipId={params.scholarshipId} />
        </Card>
        <Card
          sx={{ p: 5 }}
          elevation={2}
          component="form"
          onSubmit={handleSubmit}
        >
          {/* <Box onSubmit={handleSubmit}> */}
          <Typography variant="h4">Application</Typography>
          <hr />
          <Grid container maxWidth="md" spacing={2}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={grade}
                  label="Grade"
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField id="school" name="school" label="School" fullWidth />
            </Grid>
            <Grid sx={{ m: 1 }} />
            <Grid item xs={12}>
              <Typography variant="h6">Questions</Typography>
            </Grid>
            {isLoading && (
              <CircularProgress sx={{ mt: 2, mb: 2, align: "center" }} />
            )}
            {scholarship &&
              scholarship.questions.map((question, index) => (
                <Grid item xs={12} key={`question${index}`}>
                  {question}
                  <TextField
                    multiline
                    id={`question${index}`}
                    name={`question${index}`}
                    fullWidth
                    sx={{ mt: 1, mb: 1 }}
                  />
                </Grid>
              ))}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
          {/* </Box> */}
        </Card>
      </Container>
    </div>
  );
};

export default ApplyPage;
