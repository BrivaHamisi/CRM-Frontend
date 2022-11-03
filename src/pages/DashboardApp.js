import { useLocation } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import { AppNewsUpdate, AppWidgetSummary, AppOrderTimeline } from '../sections/@dashboard/app';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

export default function DashboardApp() {
  const theme = useTheme();
  const [complaints, setComplaints] = useState([])
  const { state: user } = useLocation();
  const [weeklyComplaints, setWeeklyComplaints] = useState(0)

  const [solved, setSolved] = useState(0)

  const [pending, setPending] = useState(0)
 
  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/complaints/', {
      'method':'GET',
    })
    .then(resp => resp.json())
    .then(async(resp) => {
      await setComplaints(resp)
      setWeeklyComplaints(resp.filter(each=>{
      return (new Date(each.date).getTime())>= (new Date().getTime()-(7*24*60*60*1000) )
    }).length)
    setSolved(resp.filter(each=>{
      return each.status_of_complaint==="solved"
    }).length)
    setPending(resp.filter(each=>{
      return each.status_of_complaint==="pending"
    }).length)
    })
    .catch(error => console.log(error))
  
   
  }, [weeklyComplaints])

  const [generalUpdates, setGeneralUpdates] = useState([
    
  ])
  useEffect(() =>{
    const fetchUpdates = async ()=>{
      const request =  await fetch('http://127.0.0.1:8000/api/general_issues/', {
        'method':'GET', })
      const response = await request.json()
      if(response !== null){
       return response
      }
     
           
    }
    fetchUpdates().then(success=>{
      if (success !== null){
        setGeneralUpdates(success)
        console.log(generalUpdates)
      }
    }).catch(error=>console.log(error))
  }, [])

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, {user?.user?.username} Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Complaints" total={weeklyComplaints} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Submitted Complaints" total={complaints.length} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Solved" total={solved} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Complaints" total={pending} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}/>
           
          

          <Grid item xs={12} md={6} lg={4}/>
          

          <Grid item xs={12} md={6} lg={8}/>

          <Grid item xs={12} md={6} lg={4}/>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="General Issues Updates"
              list={generalUpdates.map((each, index) => ({
                id: each.id,
                title : each.title,
                description: each.content,
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: new Date(each.date)
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
