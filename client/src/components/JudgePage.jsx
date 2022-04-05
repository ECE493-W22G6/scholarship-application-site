import {
  Button,
  Card,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import NavBar from "./NavBar";
import { getScholarshipInfo, ScholarshipInfo } from "./ScholarshipPage";

const theme = createTheme();

const JudgePage = () => {
  const params = useParams();
  const applicationId = params.applicationId;
  const scholarshipId = params.scholarshipId;
  const { scholarship, scholarshipIsLoading } =
    getScholarshipInfo(scholarshipId);
  const { application, applicationIsLoading } =
    getApplicationInfo(applicationId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const criterias = Object.keys(scholarship.weightings);
    const judgeScores = criterias.map((criteria, i) =>
      data.get(`criteria${i}`)
    );
    const judgeScoreMap = {};
    for (let i = 0; i < criterias.length; i++) {
      judgeScoreMap[criterias[i]] = judgeScores[i];
    }
    const requestBody = {
      application_id: applicationId,
      scholarship_id: scholarshipId,
      judge_id: sessionStorage.getItem("userId"),
      student_id: application.user_id,
      judge_scores: judgeScoreMap,
    };
    console.log(requestBody);

    axios
      .post(
        `/api/scholarships/${scholarshipId}/judge/${applicationId}/`,
        requestBody
      )
      .then((resp) => {
        console.log(`recv'd resp: ${JSON.stringify(resp)}`);
        if (resp.status === 201) {
          console.log(resp.data.message);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography component="h1" variant="h5">
            Judge Application
          </Typography>
          <ScholarshipInfo scholarshipId={params.scholarshipId} />
          <Card variant="outlined" sx={{ m: 2, p: 2 }}>
            <Typography component="h1" variant="h5">
              Application
            </Typography>
            <hr />
            {(scholarshipIsLoading || applicationIsLoading) && (
              <div align="center">
                <CircularProgress sx={{ mt: 2, mb: 2, align: "center" }} />
              </div>
            )}
            {scholarship && application && (
              <Grid container spacing={2} sx={{ pb: 2 }}>
                {scholarship.questions.map((question, index) => (
                  <Grid item xs={12} key={`question${index}`}>
                    {question}
                    <TextField
                      multiline
                      id={`question${index}`}
                      name={`question${index}`}
                      fullWidth
                      sx={{ mt: 1 }}
                      disabled
                      defaultValue={application.answers[index]}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid container spacing={2}></Grid>
          </Card>
          <Card sx={{ m: 2, p: 2 }} component="form" onSubmit={handleSubmit}>
            <Typography component="h1" variant="h5">
              Judging scores
            </Typography>
            <hr />
            {scholarshipIsLoading && (
              <div align="center">
                <CircularProgress sx={{ mt: 2, mb: 2, align: "center" }} />
              </div>
            )}
            {scholarship && (
              <div>
                <Grid
                  container
                  spacing={2}
                  sx={{ mb: 2 }}
                  justifyContent="center"
                >
                  {Object.keys(scholarship.weightings).map(
                    (criteria, index) => (
                      <Grid item xs={3} key={`criteria${index}`}>
                        <TextField
                          id={`criteria${index}`}
                          name={`criteria${index}`}
                          fullWidth
                          label={`${criteria}:`}
                          sx={{ mt: 1 }}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
                <div align="center">
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

const getApplicationInfo = (applicationId) => {
  const { data, error } = useSWR(
    `/api/applications/${applicationId}/`,
    fetcher
  );

  return {
    application: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const fetcher = (url) =>
  axios.get(url).then((res) => {
    // console.log(JSON.stringify(res));
    return res.data;
  });

export default JudgePage;
