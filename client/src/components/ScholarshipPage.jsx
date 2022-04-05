import {
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import NavBar from "./NavBar";
import PropTypes from "prop-types";

const ScholarshipPage = () => {
  const params = useParams();
  return (
    <div className="ScholarshipPage">
      <NavBar />
      <ScholarshipInfo scholarshipId={params.scholarshipId} showButton />
    </div>
  );
};

const ScholarshipInfo = ({ scholarshipId, showButton }) => {
  const { scholarship, isLoading } = getScholarshipInfo(scholarshipId);
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  const { application } = getApplication(scholarshipId, userId);
  const [openAddJudge, setOpenAddJudge] = useState(false);
  const [openWinners, setOpenWinners] = useState(false);
  const [judgesValue, setJudgesValue] = useState("");

  const handleClickOpen = () => {
    setOpenAddJudge(true);
  };

  const handleClose = () => {
    setOpenAddJudge(false);
  };

  const handleSubmit = (event) => {
    setOpenAddJudge(false);
    const requestBody = {
      judges: judgesValue,
    };
    console.log("in handle submit, sending" + requestBody.judges);

    if (!judgesValue) {
      return;
    }

    axios
      .post(`/api/scholarships/${scholarshipId}/judge/`, requestBody)
      .then((resp) => {
        console.log(`resp recv'd: ${JSON.stringify(resp)}`);
        if (resp.status === 200) {
          console.log("Judges added successfully");
        }
      });
  };

  const handleCloseScholarship = () => {
    console.log("closing scholarship " + scholarshipId);
    axios.post(`/api/scholarships/${scholarshipId}/close`, {}).then((resp) => {
      console.log("recv'd resp: " + JSON.stringify(resp));
      if (resp.status === 200) {
        console.log("scholarship successfully closed");
      }
    });
  };

  const handleGetWinners = () => {
    console.log("getting winners for " + scholarshipId);
    axios.post(`/api/mcdm/`, { scholarship_id: scholarshipId }).then((resp) => {
      console.log("recv'd resp: " + JSON.stringify(resp));
      if (resp.status === 200) {
        console.log("mcdm successful");
        setOpenWinners(true);
      }
    });
  };

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
          <Grid item xs={12}>
            <Typography variant="h5">
              Organization:{" "}
              <a href={`/organizations/${scholarship.organization_id}`}>
                {scholarship.organization_name}
              </a>
            </Typography>
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

          {showButton && (
            <Grid item textAlign="right" sx={{ mt: 5 }}>
              {userType === "student" && scholarship && scholarship.open && (
                <Button
                  variant="contained"
                  href={`/scholarships/${scholarshipId}/apply`}
                >
                  {!application && "Apply"}
                  {application && "Edit Application"}
                </Button>
              )}
              {userType === "judge" &&
                scholarship &&
                scholarship.judges &&
                scholarship.judges.includes(userId) && (
                  <Button
                    variant="contained"
                    href={`/scholarships/${scholarshipId}/judge`}
                  >
                    Judge
                  </Button>
                )}
              {scholarship && userId === scholarship.organization_id && (
                <Grid item component="form">
                  {scholarship && scholarship.open && (
                    <div>
                      <Button variant="contained" onClick={handleClickOpen}>
                        Add judges
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleCloseScholarship}
                      >
                        Close scholarship
                      </Button>
                    </div>
                  )}{" "}
                  {scholarship.applications &&
                    scholarship.judged_applications &&
                    scholarship.applications.length *
                      scholarship.judges.length ===
                      scholarship.judged_applications.length &&
                    !scholarship.open && (
                      <div>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleGetWinners}
                        >
                          Get winners
                        </Button>
                        {scholarship.winners && scholarship.winner_emails && (
                          <Dialog
                            open={openWinners}
                            onClose={() => setOpenWinners(false)}
                            sx={{ py: 2, px: 2, m: 2 }}
                          >
                            <DialogTitle>Scholarship winners</DialogTitle>
                            <Stack spacing={2} sx={{ p: 2 }}>
                              {scholarship.winners.map((winner, index) => (
                                <Card key={`winner${index}`} sx={{ p: 2 }}>
                                  {scholarship.winner_emails[index]}
                                </Card>
                              ))}
                            </Stack>
                          </Dialog>
                        )}
                      </div>
                    )}
                  <Dialog
                    open={openAddJudge}
                    onClose={handleClose}
                    sx={{ py: 2, px: 2, m: 2 }}
                  >
                    <DialogTitle>Add judge</DialogTitle>
                    <DialogContentText>
                      Add judges by typing in their user Ids
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="addJudges"
                      label="Add judges by userId, separate with ','"
                      type="text"
                      fullWidth
                      onChange={(e) => setJudgesValue(e.target.value)}
                    />
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              )}
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
  const url = `/api/applications/`;
  const args = { scholarship_id: scholarshipId, student_id: studentId };
  const { data, error } = useSWR({ url, args }, appFetcher);
  console.log("get app result " + JSON.stringify(data));

  return { application: data, isLoading: !data && !error, isError: error };
};

const appFetcher = ({ url, args }) =>
  axios.get(url, { params: args }).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });

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

const fetcher = (url) =>
  axios.get(url).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });

export default ScholarshipPage;

export { ScholarshipInfo, getScholarshipInfo, getApplication };
