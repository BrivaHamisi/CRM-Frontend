import * as React from 'react';
import { useState,useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AlignItemsList() {
  const [complaints, setComplaints] = useState([
    
  ])
  const [editComplaints, setEditComplaints] = useState([
    null
  ])
  const editBtn = (complaints) =>{
    editComplaints(complaints)
  }

  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/complaints/', {
      'method':'GET',
    })
    .then(resp => resp.json())
    .then(resp => setComplaints(resp))
    .catch(error => console.log(error))
    
  }, [])

  return (
    <div >
      {complaints.map(complaint =>{
        return (
          // <h2>{complaint.Complain_description}</h2>
        <List editBtn={editBtn} key={complaint.id} sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={complaint.description}
          secondary={
            <div>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {complaint.date}
              </Typography>
               - {complaint.events_that_took_place}
            </div>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
    </List>
        )
      })}
    </div>
  );
}