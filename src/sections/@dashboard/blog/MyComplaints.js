// import * as React from 'react';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { getUser } from '../../../pages/storage';
import API, { getConfig } from '../../../pages/API';
import { ComplaintContext } from '../../../pages/Products';


export default function MyComplaints({ complaints }) {
  const {complaint, setComplaint }= useContext(ComplaintContext)
  console.log(complaint)
  useEffect(()=>{

  },[complaint])

  

  return (
    <div>
      {complaints.map((complaint) => (
        // <h2>{complaint.Complain_description}</h2>
        <List key={complaint.id} sx={{ width: '100%', bgcolor: 'background.paper' }} onClick={()=>setComplaint(complaint)}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="My Complaints" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={complaint.description}
              secondary={
                <span style={{ display: 'block' }}>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {complaint.date}
                  </Typography>
                  - {complaint.events_that_took_place}
                </span>
              }
            />
          </ListItem>
          <Stack direction="row" padding={2} spacing={3}>
            <Stack direction="row" padding={2} spacing={3}>
              <Button variant="contained" color="success">
                Update
              </Button>
              <Button  variant="outlined" color="error">
                Delete
              </Button>
            </Stack>
          </Stack>

          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
}
