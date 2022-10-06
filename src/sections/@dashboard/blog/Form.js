import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function Form() {
  const [editComplaints, setEditComplaints] = useState([
    null
  ])
  const [complaints, setComplaints] = useState({
    Complain_description:"",
    Events_that_took_Place:"",
    Consequence_suffered: "",
    Spoken_to_someone: "",
    Dissatisfied_with_Informal_complaint: "",
    evidence:"",
    recommendation: "",

  })

  // const editBtn = (complaints) =>{
  //   setEditComplaints(complaints)
  // }

  const submitComplaint = async (complaint)=>{

    try{
        const res = await axios.post("http://127.0.0.1:8000/api/complaints/",complaint, {
    headers:{"Content-Type":"application/json"}

    })
    if (res.status===200){
      console.log(res.data)
    }
    }catch(e){
      console.log(e.response.status)
    }
      
  

  }

  return (
    <div complaints={editComplaints} padding = {2}>
      <Typography variant="h4" gutterBottom>
            Submit A Complaint  
      </Typography>
      <Box
      component="form"
      sx={{
        padding: '20px',
        '& .MuiTextField-root': { m: 1, width: '90%' },
      }}
      noValidate
      autoComplete="off"
    >
      <form action="http://127.0.0.1:8000/api/complaints/" method='post' >
      <TextField
          id="filled-textarea"
          label="Complain description"
        //   placeholder="Placeholder"
          multiline
          name='Complain_description'
          value={complaints.Complain_description}
          onChange= {(event)=>setComplaints({...complaints,Complain_description:event.target.value})}
          variant="filled"
        />

        <TextField
          id="filled-multiline-static"
          label="What are the Events that took Place?"
          multiline
          name='Events_that_took_Place'
          value={complaints.Events_that_took_Place}
          onChange= {(event)=>setComplaints({...complaints,Events_that_took_Place:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What are the Consequences that you suffered as a result of that?"
          multiline
          name='Consequence_suffered'
          value={complaints.Consequence_suffered}
          onChange= {(event)=>setComplaints({...complaints,Consequence_suffered:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Have you Spoken to someone?"
          multiline
          name='Spoken_to_someone'
          value={complaints.Spoken_to_someone}
          onChange= {(event)=>setComplaints({...complaints,Spoken_to_someone:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What are the Events that took Place?"
          multiline
          name='Events_that_took_Place'
          value={complaints.Events_that_took_Place}
          onChange= {(event)=>setComplaints({...complaints,Events_that_took_Place:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Are you satisfied with Informal complaint resolution Mechanism?"
          multiline
          name='Dissatisfied_with_Informal_complaint'
          value={complaints.Dissatisfied_with_Informal_complaint}
          onChange= {(event)=>setComplaints({...complaints,Dissatisfied_with_Informal_complaint:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Attach Any Evidence that you have?"
          multiline
          name='evidence'
          value={complaints.evidence}
          onChange= {(event)=>setComplaints({...complaints,evidence:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What do you recommend?"
          multiline
          name='recommendation'
          value={complaints.recommendation}
          onChange= {(event)=>setComplaints({...complaints,recommendation:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <Stack direction="row" padding = {2} spacing={3}>
      <Button type='submit' variant="contained" color="success">
        Submit Complaint
      </Button>
      <Button onClick={()=>''} variant="outlined" color="error">
        Cancel
      </Button>
    </Stack>
      </form> 
    
    </Box>
    
    </div>
    
  )
}

export default Form