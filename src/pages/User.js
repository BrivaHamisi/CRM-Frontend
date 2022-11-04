import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid,
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { AppNewsUpdate } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function User() {
  const [selected, setSelected] = useState([]);

  const [filterName, setFilterName] = useState('');

  // Fetching the Feedbacks from the API
  const [feedbacks, setFeedbacks] = useState([
    
  ])
  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/feedbacks/', {
      'method':'GET',headers:{"Content-Type":"application/json"}
    })
    .then(resp => resp.json())
    .then(resp => setFeedbacks(resp))
    .then(console.log(feedbacks))
    .catch(error => console.log(error))
    
  }, [filterName])


  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Received Feedbacks
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Launch Appeal
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          {/* Feebacks Here */}
          <Grid item xs={12} md={6} lg={8}>
          <List sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
        {
          feedbacks.map(feedback=>{
            return <ListItem alignItems="flex-start" key={feedback.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={feedback.content}
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
          })
        }
      <Divider variant="inset" component="li" />
    </List>
          </Grid>
            
        </Card>
      </Container>
    </Page>
  );
}
