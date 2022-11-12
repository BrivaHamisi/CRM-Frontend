import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

import APIService from '../../../components/APIService';
import { storeUser } from '../../../pages/storage';

// ----------------------------------------------------------------------

const baseUrl = 'http://127.0.0.1:8000/api/users/'
export default function LoginForm() {
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const LoginSchema = Yup.object().shape({
    Username: Yup.string().required('Username is required'),
    Password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    Username: '',
    Password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  const [logindata, setLoginData] =useState({
    'Username':'',
    'Password':''
  })
  

  const HandleChange =(event)=>{
    setLoginData({
     ...logindata,[event.target.name]: event.target.value
    });
      console.log(logindata)
  }

  const HandleSubmit=(event)=>{
    event.preventDefault();
    console.log( `Credentials are ${username} ${password}`)
    APIService.LoginUser({username, password}).then(async (data) => {
      console.log(data);
      await storeUser(data);
      navigate('/dashboard/app', { replace: true, state: data });
    })
  }
 
  return (
    <FormProvider methods={methods}>
      <Stack spacing={3}>
        <RHFTextField onChange={e => setUsername(e.target.value)} value={username} name="Username" label="Username" />

        <RHFTextField
         onChange={e => setPassword(e.target.value)} 
         value={password}
          name="Password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton onClick={HandleSubmit} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
