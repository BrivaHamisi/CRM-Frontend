import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, Stack } from '@mui/material';

function Form() {
    const [value, setValue] = React.useState('Controlled');

    // const handleChange = (event: "React.ChangeEvent<HTMLInputElement>") => {
    //   setValue(event.target.value);
    // };
  return (
    <div padding = {2}>
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
      <div>
      <TextField
          id="filled-textarea"
          label="Complain description"
        //   placeholder="Placeholder"
          multiline
          variant="filled"
        />

        <TextField
          id="filled-multiline-static"
          label="What are the Events that took Place?"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What are the Consequences that you suffered as a result of that?"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Have you Spoken to someone?"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What are the Events that took Place?"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Are you satisfied with Informal complaint resolution Mechanism?"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Attach Any Evidence that you have?"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="What do you recommend?"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="filled"
        />
      </div> 
    </Box>
    <Stack direction="row" padding = {2} spacing={3}>
      <Button onClick={()=>''} variant="contained" color="success">
        Submit Complaint
      </Button>
      <Button onClick={()=>''} variant="outlined" color="error">
        Cancel
      </Button>
    </Stack>
    </div>
    
  )
}

export default Form