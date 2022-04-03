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
import { useParams } from "react-router";
import useSWR from "swr";
import NavBar from "./NavBar";
import PropTypes from "prop-types";

const ScholarshipPage = () => {
  const params = useParams();
  return (
    <div className="ScholarshipPage">
      <NavBar />
      <ScholarshipInfo
        scholarshipId={params.scholarshipId}
        buttonState="apply"
      />
    </div>
  );
};

const ScholarshipInfo = ({ scholarshipId, buttonState }) => {
  const { scholarship, isLoading } = getScholarshipInfo(scholarshipId);

  if (isLoading) {
    return (
      <div align="center">
        <CircularProgress />
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
            <Typography variant="h7">
              <strong>Amount: </strong>
              {scholarship.amount}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h7">
              <strong>Number of awards: </strong>
              {scholarship.number_of_awards}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7">
              <strong>Ends: </strong>
              {scholarship.end_date || "No end date"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7">
              <strong>Description:</strong> {scholarship.description}
            </Typography>
          </Grid>

          {buttonState === "apply" && (
            <Grid item textAlign="right" sx={{ mt: 5 }}>
              <Button variant="contained" href={`/apply/${scholarshipId}`}>
                Apply
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

ScholarshipInfo.propTypes = {
  scholarshipId: PropTypes.string,
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
    // console.log(JSON.stringify(res));
    return res.data;
  });

export default ScholarshipPage;

export { ScholarshipInfo, getScholarshipInfo };
