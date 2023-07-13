import { Box, Button, Grid, Link } from '@mui/material'
import React from 'react'
import MyTextField from '../components/auth/MyTextField'
// import { Link } from 'react-router-dom'

const LoginForm = ({ handleSubmit, errors, isLoading }) => {
  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <MyTextField
          margin='normal'
          errors={errors.user}
          label='Email or Username'
          name='user'
          autoComplete='username'
          autoFocus={true}
        />
        <MyTextField
          errors={errors.password}
          label='Password'
          name='password'
          autoComplete='current-password'
          type='password'
        />
      </Grid>
      <Button disabled={isLoading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to='#' variant='body2'>
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginForm
