// import * as React from 'react';
import React, { useState, useEffect, useCallback } from 'react';
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

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [editComplaints, setEditComplaints] = useState([null]);

  const editBtn = (complaints) => {
    editComplaints(complaints);
  };

  const getComplaints = useCallback(async () => {
    const config = await getConfig();
    API.get('/api/complaints/?current_user=true', config)
      .then((res) => {
        setComplaints(res.data ?? []);
        // console.log(data)
      })
      .catch((err) => {
        console.log(err?.response?.data || err?.response || err);
      });
  }, []);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  return (
    <div>
      {complaints.map((complaint) => (
        // <h2>{complaint.Complain_description}</h2>
        <List key={complaint.id} sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="My Complaints" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={complaint.description}
              secondary={
                <span style={{display: "block"}}>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {complaint.date}
                  </Typography>
                  - {complaint.events_that_took_place}
                </span>
              }
            />
          </ListItem>
          <Stack direction="row" padding={2} spacing={3}>
            {/* <Button onClick={()=>editBtn(complaints)} variant="contained" color="success">
                Update
              </Button> */}
            <Button onClick={() => editBtn(complaints)} variant="outlined" color="error">
              Delete
            </Button>
          </Stack>

          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
}
