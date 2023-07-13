import { Box, Button, Grid, Link } from '@mui/material'
import React from 'react'
import MyTextField from '../components/auth/MyTextField'

const RegistrationForm = ({ handleSubmit, errors, isLoading }) => {
  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <MyTextField
          autoComplete='given-name'
          name='firstName'
          label='First Name'
          errors={errors?.firstName}
          autoFocus={true}
        />
        <MyTextField autoComplete='family-name' name='lastName' label='Last Name' errors={errors?.lastName} />
        <MyTextField label='Username' name='username' errors={errors?.username} />
        <MyTextField label='Email' name='email' errors={errors?.email} autoComplete='email' />
        <MyTextField label='Mobile No' name='mobile' errors={errors?.mobile} autoComplete='mobile' />
        <MyTextField
          label='Password'
          name='password'
          errors={errors?.password}
          type='password'
          autoComplete='new-password'
        />
        <MyTextField label='Added By' name='addedBy' autoComplete='off' />
      </Grid>
      <Button disabled={isLoading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link href='/login' variant='body2'>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RegistrationForm
