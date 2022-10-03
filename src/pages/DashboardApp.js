import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import { AppNewsUpdate, AppWidgetSummary, AppOrderTimeline } from '../sections/@dashboard/app';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Complaints" total={114} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Submitted Complaints" total={1234} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Solved" total={790} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Complaints" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}/>
           
          

          <Grid item xs={12} md={6} lg={4}/>
          

          <Grid item xs={12} md={6} lg={8}/>

          <Grid item xs={12} md={6} lg={4}/>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="General Issues Updates"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }
              ))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Complaints Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1st Complaint',
                  '2nd Complaint',
                  '3rd Complaint',
                  '4th Complaint',
                  '5th Complaint',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}/>

          <Grid item xs={12} md={6} lg={8}/>
        </Grid>
      </Container>
    </Page>
  );
}
