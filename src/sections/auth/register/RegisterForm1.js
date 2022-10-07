import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm({setActive, active}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    RegNo: '',
    Course: '',
    Campus: '',
    Department: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <Stack sx={{display:active===1?"flex":'none'}}>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}  >
      <Stack spacing={3} >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="RegNo" label="Registration Number" />
          <RHFTextField name="Course" label="Course" />
        </Stack>

        <RHFTextField name="Campus" label="Campus" />
        <RHFTextField name="PhoneNumber" label="Phone Number" />
        <RHFTextField name="Department" label="Department" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} >
          Register
        </LoadingButton>
        <LoadingButton onClick={setActive(0)}>Back</LoadingButton>
      </Stack>
    </FormProvider>
    </Stack>
  );
}
