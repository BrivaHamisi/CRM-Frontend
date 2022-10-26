
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Blog() {
  const [complaints, setComplaints] = useState([
    
  ])
  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/complaints/', {
      'method':'GET',
      headers:{
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Content-Type':'application/json',
        'authorization':'Token 782d582308a88ae82d4d3cee3175c1753afa02e2'
      },
      // body:JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(resp => setComplaints(resp))
    .catch(error => console.log(error))
    
  }, [])
  return (
  <Page title="Dashboard: Complaints">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Complaints
          </Typography>
          <Button  variant="contained" component={RouterLink} to={"/dashboard/new_complaint"} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Complaint
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid  spacing={3}>
        <BlogPostCard/>
        </Grid>
      </Container>
    </Page>
  );
}
