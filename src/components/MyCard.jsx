import React from 'react'
import { Container, Grid, Paper, Stack, Typography } from '@mui/material'

const MyCard = ({ title, color, value }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={5} sx={{ bgcolor: color, color: 'white' }}>
        <Stack direction={'column'} gap={2} padding={2}>
          <Typography variant='h5'>{title}</Typography>
          <Typography variant='h1'>{value}</Typography>
        </Stack>
      </Paper>
    </Grid>
  )
}

export default MyCard
