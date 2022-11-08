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
    user: "",
    feedback_id: "",

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
            Submit An Appeal
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
      <form action="http://127.0.0.1:8000/api/appeals/" method='post' >
      <TextField
          id="filled-textarea"
          label="Why do you think the Complaint Feedback was not satisfying?"
        //   placeholder="Placeholder"
          multiline
          name='Complain_description'
          value={complaints.Complain_description}
          onChange= {(event)=>setComplaints({...complaints,Complain_description:event.target.value})}
          variant="filled"
        />

        <TextField
          id="filled-multiline-static"
          label="What do you recommend?"
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
          label="Attach the necessary supporting document?"
          multiline
          name='Consequence_suffered'
          value={complaints.Consequence_suffered}
          onChange= {(event)=>setComplaints({...complaints,Consequence_suffered:event.target.value})}
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <Button
          variant="contained"component="label">
          Upload File
          <input
            type="file"
            hidden
        />
</Button>

        <Stack direction="row" padding = {2} spacing={3}>
      <Button type='submit' variant="contained" color="success">
        Submit Appeal
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