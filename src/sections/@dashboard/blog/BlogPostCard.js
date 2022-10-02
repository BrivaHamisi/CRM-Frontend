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
import Form from './Form';

export default function AlignItemsList() {
  const [complaints, setComplaints] = useState([
    
  ])
  const [editComplaints, setEditComplaints] = useState([
    null
  ])
  const editBtn = (complaints) =>{
    setEditComplaints(complaints)
  }

  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/complaints/', {
      'method':'GET',
      // headers:{
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Credentials": "true",
      //   "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      //   'Content-Type':'application/json',
      //   'authorization':'Token 7569632943cce9933fffd9e26f3f7f3a78cb9391'
      // }
    })
    .then(resp => resp.json())
    .then(resp => setComplaints(resp))
    .catch(error => console.log(error))
    
  }, [])

  return (
    <div >
      <Form complaintS={editComplaints}/>
      {/* <h3>Title</h3> */}
      {complaints.map(complaint =>{
        return (
          // <h2>{complaint.Complain_description}</h2>
        <List key={complaint.id} sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={complaint.Complain_description}
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
               - {complaint.Events_that_took_Place}
            </div>
          }
        />
      </ListItem>
      <Stack direction="row" padding = {2} spacing={3}>
      <Button onClick={()=>''} variant="contained" color="success">
        Update
      </Button>
      <Button onClick={()=>''} variant="outlined" color="error">
        Delete
      </Button>
    </Stack>

      <Divider variant="inset" component="li" />
      
    </List>
        )
      })}
    </div>
    // <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    //   <ListItem alignItems="flex-start">
    //     <ListItemAvatar>
    //       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    //     </ListItemAvatar>
    //     <ListItemText
    //       primary="Brunch this weekend?"
    //       secondary={
    //         <div>
    //           <Typography
    //             sx={{ display: 'inline' }}
    //             component="span"
    //             variant="body2"
    //             color="text.primary"
    //           >
    //             Ali Connors
    //           </Typography>
    //           {" — I'll be in your neighborhood doing errands this…"}
    //         </div>
    //       }
    //     />
    //   </ListItem>
    //   <Divider variant="inset" component="li" />
    //   <ListItem alignItems="flex-start">
    //     <ListItemAvatar>
    //       <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    //     </ListItemAvatar>
    //     <ListItemText
    //       primary="Summer BBQ"
    //       secondary={
    //         <div>
    //           <Typography
    //             sx={{ display: 'inline' }}
    //             component="span"
    //             variant="body2"
    //             color="text.primary"
    //           >
    //             to Scott, Alex, Jennifer
    //           </Typography>
    //           {" — Wish I could come, but I'm out of town this…"}
    //         </div>
    //       }
    //     />
    //   </ListItem>
    //   <Divider variant="inset" component="li" />
    //   <ListItem alignItems="flex-start">
    //     <ListItemAvatar>
    //       <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
    //     </ListItemAvatar>
    //     <ListItemText
    //       primary="Oui Oui"
    //       secondary={
    //         <div>
    //           <Typography
    //             sx={{ display: 'inline' }}
    //             component="span"
    //             variant="body2"
    //             color="text.primary"
    //           >
    //             Sandra Adams
    //           </Typography>
    //           {' — Do you have Paris recommendations? Have you ever…'}
    //         </div>
    //       }
    //     />
    //   </ListItem>
    // </List>
  );
}