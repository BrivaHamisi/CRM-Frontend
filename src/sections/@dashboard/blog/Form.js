import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, Stack } from '@mui/material';
import { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../../../pages/storage';
import API, { getConfig } from '../../../pages/API';
import { ComplaintUpdateContext } from '../../../App';


function Form() {
  const navigate = useNavigate();
  const {complaintUpdate} = useContext(ComplaintUpdateContext)
  useEffect(()=>{
  console.log('The complain to be updated:', complaintUpdate)
  },[complaintUpdate])
  const [editComplaints, setEditComplaints] = useState([null])
  const [complaint, setComplaints] = useState(complaintUpdate!==null?complaintUpdate:{
    description:"",
    events_that_took_place:"",
    consequence_suffered: "",
    spoken_to_someone: "",
    dissatisfied_with_informal_complaint: "",
    evidence:"",
    recommendation: "",
  })

 

  const handleSubmitComplaint = async (event: Event)=>{
    event.preventDefault();
    const user = await getUser();
    const body = { ...complaint, user: user?.user?.id }

    API.post("/api/complaints/", body, await getConfig())
      .then(({ data }) => {
        console.log(data)
      }).catch(err => {
        const error = err?.response?.data
        console.log(error)
      })
  }

  // Update Complaint
  const editComplaint = async (event: Event, id)=>{
    event.preventDefault();
    const user = await getUser();
    const body = complaint
    console.log()

    API.put(`/api/complaints/${id}/`, body, await getConfig())
      .then(({ data }) => {
        console.log(data.user)
        navigate("/dashboard/complaints_status");
      }).catch(err => {
        const error = err?.response?.data
        console.log(error)
      })
  }

  const updateComplaints = (event) => {
    setComplaints(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <div complaints={editComplaints} padding = {2}>
      <Typography variant="h4" gutterBottom>
            Submit A Complaint  
      </Typography>
      <Box
      sx={{
        padding: '20px',
        '& .MuiTextField-root': { m: 1, width: '90%' },
      }}
      noValidate
      autoComplete="off"
    >
      <form method='post' >
      <TextField
          id="filled-textarea"
          label="Complain description"
        //   placeholder="Placeholder"
          multiline
          name='description'
          value={complaint.description}
          onChange = {updateComplaints}
          variant="filled"
        />

        <TextField
          id="filled-multiline-static"
          label="What are the Events that took Place?"
          multiline
          name='events_that_took_place'
          value={complaint.events_that_took_place}
          onChange = {updateComplaints}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What are the Consequences that you suffered as a result of that?"
          multiline
          name='consequence_suffered'
          value={complaint.consequence_suffered}
          onChange = {updateComplaints}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Have you Spoken to someone?"
          multiline
          name='spoken_to_someone'
          value={complaint.spoken_to_someone}
          onChange = {updateComplaints}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        {/* <TextField
          id="filled-multiline-static"
          label="What are the Events that took Place?"
          multiline
          name='Events_that_took_Place'
          value={complaints.Events_that_took_Place}
          onChange= {(event)=>setComplaints({...complaints,Events_that_took_Place:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        /> */}
        <TextField
          id="filled-multiline-static"
          label="Are you satisfied with Informal complaint resolution Mechanism?"
          multiline
          name='dissatisfied_with_informal_complaint'
          value={complaint.dissatisfied_with_informal_complaint}
          onChange = {updateComplaints}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Attach Any Evidence that you have?"
          multiline
          name='evidence'
          value={complaint.evidence}
          onChange = {updateComplaints}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What do you recommend?"
          multiline
          name='recommendation'
          value={complaint.recommendation}
          onChange = {updateComplaints}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <Stack direction="row" padding = {2} spacing={3}>
     {complaintUpdate === null?<Button type="submit" variant="contained" color="success" onClick={(e)=>handleSubmitComplaint(e)}>
        Submit Complaint
      </Button>:  <Button type="submit" variant="contained" color="success" onClick={(e)=>editComplaint(e, complaint.id)} >
        Update
      </Button>}
      <Button type="button" variant="outlined" color="error">
        Cancel
      </Button>
    </Stack>
      </form> 
    
    </Box>
    
    </div>
  )
}

export default Form