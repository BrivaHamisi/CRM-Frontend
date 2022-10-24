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

// ----------------------------------------------------------------------

const baseUrl = 'http://127.0.0.1:8000/api/users/'
export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
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
    'Email':'',
    'Password':''
  })
  

  const HandleChange =(event)=>{
    setLoginData({
     ...logindata,[event.target.name]: event.target.value
    });
      console.log(logindata)
  }

  const HandleSubmit=(event)=>{
    const userLoginData = new FormData();
    userLoginData.append('Email',logindata.Email);
    userLoginData.append('Password',logindata.Password);

    try{
      axios.post(baseUrl, userLoginData).then((res)=>{
        console.log(res.data);
      })
    }catch(error){
      console.log(error)
    }

  }
 
  return (
    <FormProvider methods={methods}>
      <Stack spacing={3}>
        <RHFTextField onChange={HandleChange} value={logindata.Email} name="Email" label="Email address" />

        <RHFTextField
         onChange={HandleChange} 
         value={logindata.Password}
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
