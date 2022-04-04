import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import useSWR from "swr";

const ScholarshipList = ({ organizationId }) => {
  // const { allScholarships, isLoading } = getAllScholarships();
  const { data, error } = useSWR(`/api/scholarships/`, getter);

  if (!data && !error) {
    return (
      <div align="center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper elevation={2} sx={{ m: 2, p: 2 }}>
      <Typography component="h1" variant="h4">
        Scholarships
      </Typography>
      <hr />
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data &&
          data.results.map((scholarship, index) => (
            <Grid item key={`scholarship${index}`} xs={12}>
              <Typography variant="h4">{scholarship.name}</Typography>
              <strong>{scholarship.amount}</strong>
              <strong>{scholarship.number_of_awards}</strong>
              <Typography variant="subtitle1">
                {scholarship.organization_name}
              </Typography>
              <p>{scholarship.description}</p>
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};

const getAllScholarships = () => {
  const { data, error } = useSWR(`/api/scholarships/`, getter);
  console.log(data);
  console.log(error);

  return {
    allScholarships: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const getter = (url) => {
  axios.get(url).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });
};

export default ScholarshipList;
