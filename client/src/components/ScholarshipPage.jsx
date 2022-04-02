import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import NavBar from "./NavBar";

const ScholarshipPage = ({ scholarshipId }) => {
  return (
    <div className="ScholarshipPage">
      <NavBar />
      <ScholarshipInfo scholarshipId={scholarshipId} />
    </div>
  );
};

const ScholarshipInfo = ({ scholarshipId }) => {
  const { scholarship, isLoading } = getScholarshipInfo(scholarshipId);

  if (isLoading) {
    return (
      <div align="center">
        <CircularProgress active />
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper variant="outlined" sx={{ my: { xs: 3 }, p: { xs: 2 } }}>
        <Typography variant="h5" gutterBottom>
          Scholarship Information
        </Typography>
        <hr />
        <Grid container spacing={3} justifyContent="flex">
          <Grid item xs={12}>
            <Typography variant="h3">{scholarship.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h7">Amount: {scholarship.amount}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h7">
              Number of awards: {scholarship.number_of_awards}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7">
              Ends: {scholarship.end_date || "No end date"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7">
              <b>Description:</b> {scholarship.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid item textAlign="right" sx={{ mt: 5 }}>
          <Button variant="contained">Apply</Button>
        </Grid>
      </Paper>
    </Container>
  );
};

const getScholarshipInfo = (scholarshipId) => {
  const { data, error } = useSWR(
    `/api/scholarships/${scholarshipId}/`,
    fetcher
  );

  return {
    scholarship: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const fetcher = (url) =>
  axios.get(url).then((res) => {
    console.log(JSON.stringify(res));
    return res.data;
  });

export default ScholarshipPage;
