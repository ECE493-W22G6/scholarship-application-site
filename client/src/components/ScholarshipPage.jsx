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
  const userId = localStorage.getItem("userId");
  // const { application } = getApplication(scholarshipId, userId);

  if (isLoading) {
    return (
      <div align="center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper variant="outlined" sx={{ my: { xs: 2 }, p: { xs: 2 } }}>
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
              <Button
                variant="contained"
                href={`/scholarships/${scholarshipId}/apply`}
              >
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

const getApplication = (scholarshipId, studentId) => {
  const url = `/api/scholarships/`;
  console.log("test1", scholarshipId, studentId);
  const { data, error } = useSWR(
    { url, args: { scholarship_id: scholarshipId, student_id: studentId } },
    appFetcher
  );

  return { application: data, error };
};

const getScholarshipInfo = (scholarshipId) => {
  const { data, error } = useSWR(
    `/api/scholarships/${scholarshipId}/`,
    fetcher
  );
  console.log(data);
  console.log(error);

  return {
    scholarship: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const appFetcher = (url, args) =>
  axios.get(url, { params: args }).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });

const fetcher = (url) =>
  axios.get(url).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });

export default ScholarshipPage;

export { ScholarshipInfo, getScholarshipInfo };
