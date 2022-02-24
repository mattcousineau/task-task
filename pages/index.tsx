import styled from "@emotion/styled";
import { Container, CssBaseline, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import WorkRequestTable from "../components/WorkRequestTable";

const StyledContainer = styled(Container)`
  padding-top: 10px;
`;
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TASK TASK</title>
        <meta name="description" content="Task Task Work Request System" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <CssBaseline />
        <StyledContainer>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Welcome, UserName!
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <WorkRequestTable />
            </Grid>
            <Grid item xs={4}>
              Work in progress!!!!
            </Grid>
            <Grid item xs={8}>
              <WorkRequestTable />
            </Grid>
          </Grid>
        </StyledContainer>
      </div>
    </div>
  );
};

export default Home;
