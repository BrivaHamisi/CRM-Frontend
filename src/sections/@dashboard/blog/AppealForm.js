import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import API, { getConfig } from '../../../pages/API';
import { getUser } from '../../../pages/storage';

function Form() {
  const [editComplaints, setEditComplaints] = useState([null]);
  const [complaints, setComplaints] = useState({
    Complain_description: '',
    Events_that_took_Place: '',
    Consequence_suffered: '',
    user: '',
    feedback_id: '',
  });
  const [document, setDocument] = useState({ document: undefined, url: undefined });
  const { state: feedback } = useLocation();

  const submitComplaint = async (event) => {
    event.preventDefault();
    const { complainant } = await getUser() || { complainant: null };

    const yes = true;
    const body = {
      decision_not_fair: yes ? 'yes' : 'no',
      what_to_happen: "Test",
      user: complainant,
      feedback: feedback.id,
    };
    const documents = document.document;
    if (documents) body.documents = documents

    const formData = new FormData();
    const keys = Object.keys(body);

    for (let i = 0; i < keys.length; i+=1) {
      const key = keys[i];
      const value = body[key];
      formData.append(key, value);
    }

    // eslint-disable-next-line no-restricted-syntax
    // for (const [key, value] of formData) {
    //   console.log(key, value);
    // }
    // return;
    
    // eslint-disable-next-line no-unreachable
    API.post('/api/appeals/', formData, await getConfig(true))
      .then(({ data }) => {
        console.log("Data:", data);
      })
      .catch(({ response }) => {
        console.log("Error:", response?.data);
      });
  };

  const handleFileSelection = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setDocument({
        document: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div complaints={editComplaints} padding={2}>
      <Typography variant="h4" gutterBottom>
        Submit An Appeal
      </Typography>
      {/* <pre>{JSON.stringify(feedback, null, 4)}</pre> */}
      <Box
        component="div"
        sx={{
          padding: '20px',
          '& .MuiTextField-root': { m: 1, width: '90%' },
        }}
        noValidate
        autoComplete="off"
      >
        <form method="post" onSubmit={submitComplaint}>
          <TextField
            id="filled-textarea"
            label="Why do you think the Complaint Feedback was not satisfying?"
            //   placeholder="Placeholder"
            multiline
            name="Complain_description"
            value={complaints.Complain_description}
            onChange={(event) => setComplaints({ ...complaints, Complain_description: event.target.value })}
            variant="filled"
          />

          <TextField
            id="filled-multiline-static"
            label="What do you recommend?"
            multiline
            name="Events_that_took_Place"
            value={complaints.Events_that_took_Place}
            onChange={(event) => setComplaints({ ...complaints, Events_that_took_Place: event.target.value })}
            rows={4}
            //   defaultValue="Default Value"
            variant="filled"
          />

          <Button variant="contained" component="label" htmlFor='choose-file'>
              Choose a file
              <input
                type="file"
                id="choose-file"
                accept=".doc, .docx, application/msword, .pdf"
                onChange={handleFileSelection}
                hidden
                />
          </Button>
          <div>{document.document?.name}</div>

          <Stack direction="row" padding={2} spacing={3}>
            <Button type="submit" variant="contained" color="success">
              Submit Appeal
            </Button>

            <Button type="button" onClick={() => ''} variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
}

export default Form;
