import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import API, { getConfig } from '../../../pages/API';
import { storeUser } from '../../../pages/storage';
// import { getUser } from '../../../pages/storage';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username required'),
    first_name: Yup.string().required('First name required'),
    last_name: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    reg_no: Yup.string().required('Registration Number is required'),
    course: Yup.string().required('Course is required'),
    campus: Yup.string().required('Campus is required'),
    phone_number: Yup.string().required('Phone Number is required'),
    department: Yup.string().required('Department is required'),
  });

  const [register, setRegister] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    reg_no: '',
    course: '',
    campus: '',
    phone_number: '',
    department: '',
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    //  defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    const body = {
      user: {
        username: register.username,
        password: register.password,
        first_name: register.first_name,
        last_name: register.last_name,
        email: register.email,
      },
      reg_no: register.reg_no,
      course: register.course,
      campus: register.campus,
      phone_number: register.phone_number,
      department: register.department
    };

    API.post('/api/complainants/', body)
      .then(({ data }) => {
        console.log(data);
        storeUser()
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        const error = err?.response?.data;
        console.log(error);
      });
  };

  const registerUser = (event) => {
    setRegister((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="username" value={register.username} onChange={registerUser} label="Username" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="first_name" value={register.first_name} onChange={registerUser} label="First name" />
          <RHFTextField name="last_name" value={register.last_name} onChange={registerUser} label="Last name" />
        </Stack>

        <RHFTextField name="email" value={register.email} onChange={registerUser} label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          value={register.password}
          onChange={registerUser}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="reg_no" value={register.reg_no} onChange={registerUser} label="Registration Number" />
          <RHFTextField name="course" value={register.course} onChange={registerUser} label="Course" />
        </Stack>

        <RHFTextField name="campus" value={register.campus} onChange={registerUser} label="Campus" />
        <RHFTextField name="phone_number" value={register.phone_number} onChange={registerUser} label="Phone Number" />
        <RHFTextField name="department" value={register.department} onChange={registerUser} label="Department" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
