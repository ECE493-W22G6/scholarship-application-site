import {
  Card,
  CardActionArea,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import useSWR from "swr";

const ScholarshipList = ({ organizationId }) => {
  const { scholarships, isLoading } = getScholarships(organizationId);
  console.log("print scholarships " + scholarships);

  if (isLoading) {
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
        {scholarships &&
          scholarships.result.map((scholarship, index) => (
            <Grid item key={`scholarship${index}`} xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <CardActionArea href={`/scholarships/${scholarship._id}`}>
                  <Typography variant="h4">{scholarship.name}</Typography>
                  <strong>Amount: {scholarship.amount}</strong>
                  <Typography>
                    <strong>
                      Number of awards:{scholarship.number_of_awards}
                    </strong>
                  </Typography>
                  <Typography variant="subtitle1">
                    Organization: {scholarship.organization_name}
                  </Typography>
                  <p>Description: {scholarship.description}</p>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};

const getScholarships = (organizationId) => {
  const url = "/api/scholarships/";
  if (organizationId) {
    const params = { organization_id: organizationId };
    const { data, error } = useSWR({ url, params }, getterParam);
    console.log("data: " + JSON.stringify(data));
    console.log("error: " + error);
    return {
      scholarships: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { data, error } = useSWR(url, getter);

  return {
    scholarships: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const getterParam = ({ url, params }) =>
  axios.get(url, { params }).then((res) => res.data);

const getter = (url) =>
  axios.get(url).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });

export default ScholarshipList;
