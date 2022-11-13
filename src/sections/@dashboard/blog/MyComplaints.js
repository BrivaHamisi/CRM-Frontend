// import * as React from 'react';
import { useState, useEffect, useCallback, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Navigate, Router, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { getUser } from '../../../pages/storage';
import { PDFDownloadLink } from '@react-pdf/renderer';
import API, { getConfig } from '../../../pages/API';
import { ComplaintContext } from '../../../pages/Products';
import { ComplaintUpdateContext } from '../../../App';
import { getUser } from '../../../pages/storage';

import MyApp from '../../../pages/Report';

// Delete Complaint
const deleteComplaint = async (id) => {
  const user = await getUser();
  // const body = complaint
  console.log();

  API.delete(`/api/complaints/${id}/`, await getConfig())
    .then(({ data }) => {
      console.log(data.user);
    })
    .catch((err) => {
      const error = err?.response?.data;
      console.log(error);
    });
};

export default function MyComplaints({ complaints }) {
  const { complaint, setComplaint } = useContext(ComplaintContext);
  const { complaintUpdate, setComplaintUpdate } = useContext(ComplaintUpdateContext);

  const navigate = useNavigate();
  console.log(complaint);
  useEffect(() => {}, [complaint]);

  return (
    <div>
      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          // <h2>{complaint.Complain_description}</h2>
          <List
            key={complaint.id}
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            onClick={() => setComplaint(complaint)}
          >
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
                {complaint.status_of_complaint === 'submitted' ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setComplaintUpdate(complaint);
                      navigate('/dashboard/new_complaint');
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  ''
                )}
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (window.confirm('Are you sure want to delete')) {
                      deleteComplaint(complaint.id);

                      navigate(0);
                    }
                  }}
                  color="error"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>

            <Divider variant="inset" component="li" />
          </List>
        ))
      ) : (
        <p>You have not submmited any complaint</p>
      )}

      <PDFDownloadLink fileName="complaints.pdf" document={<MyApp />}>
        <Button>Download</Button>
      </PDFDownloadLink>
    </div>
  );
}
