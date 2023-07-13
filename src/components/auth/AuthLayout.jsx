import { Avatar, Box, Container, CssBaseline, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import Copyright from '../Copyright'
import logo from '../../assets/logo.png'

const AuthLayout = ({ isLoading, label, error, children }) => {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <img src={logo} alt='Visavel Logo' />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {label}
        </Typography>
        {isLoading && (
          <Box sx={{ width: '50%', mt: 2 }}>
            <LinearProgress />
          </Box>
        )}
        {error && (
          <Typography color='red' mt={2}>
            {`*${error}`}
          </Typography>
        )}
        {children}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default AuthLayout
