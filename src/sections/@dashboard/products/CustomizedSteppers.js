import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const steps = [
  {
    label: 'Submitted',
    description: `Your Complaint has been submitted to the necessary Authority For Checkup and Investigation.`,
  },
  {
    label: 'Pending',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Solved',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Appealed',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function CustomizedSteppers({complaint}) {
  const [activeStep, setActiveStep] = React.useState(2);
 
  React.useEffect(()=>{
    if (complaint !== null){
       const status =  steps.filter(each=> each.label.toLowerCase() === complaint.status_of_complaint)
    console.log(steps.indexOf(status[0]))
     setActiveStep(steps.indexOf(status[0]))
    }
   
  }, [activeStep, complaint])
  



  // const handleReset = () => {
  //   setActiveStep(1);
  // };

  return (
    <Box sx={{ maxWidth: 1000 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}

