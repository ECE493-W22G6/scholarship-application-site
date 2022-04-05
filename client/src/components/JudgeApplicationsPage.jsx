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
import { useParams } from "react-router";
import useSWR from "swr";
import NavBar from "./NavBar";

const JudgeApplicationsPage = () => {
  const params = useParams();
  const { applications, applicationsIsLoading } = getScholarshipApplications(
    params.scholarshipId
  );

  return (
    <div className="JudgeApplicationsPage">
      <NavBar />
      <Paper elevation={2} sx={{ m: 2, p: 2 }}>
        <Typography variant="h4">Judge Applications</Typography>
        <hr />
        <Grid container spacing={2}>
          {applicationsIsLoading && (
            <div align="center">
              <CircularProgress />
            </div>
          )}
          {!applications && (
            <Typography sx={{ m: 2 }} variant="h5">
              No applications to show
            </Typography>
          )}
          {applications &&
            applications.result.map((applicationId, index) => (
              <Grid item key={`application${index}`} xs={12} sx={{ p: 2 }}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <CardActionArea
                    href={`/scholarships/${params.scholarshipId}/judge/${applicationId}`}
                  >
                    <Typography variant="h6">{applicationId}</Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </div>
  );
};

const getScholarshipApplications = (scholarshipId) => {
  const { data, error } = useSWR(
    `/api/scholarships/${scholarshipId}/applications/`,
    fetcher
  );
  console.log(data);
  console.log(error);

  return {
    applications: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const fetcher = (url) =>
  axios.get(url).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });

export default JudgeApplicationsPage;
