import { Container, Grid, Paper, Stack, Typography, Divider } from '@mui/material'
import React from 'react'
import MyCard from '../components/MyCard'
import { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useState } from 'react'

const Dashboard = () => {
  const [values, setValues] = useState({})
  const { data } = useFetch('/dashbord')
  useEffect(() => setValues(data), [data])
  useEffect(() => {})
  return (
    <Container maxWidth='lg'>
      <Typography variant='h2' align='center'>
        {' '}
        Today Stats{' '}
      </Typography>
      <Grid container xs={12} spacing={2}>
        <MyCard title='No of New Agents Today' value={values?.newAgentsToday} color='#018338' />
        <MyCard title='No of New Users Today' value={values?.newUsersToday} color='#f5bd00' />
        <MyCard title='No of New Nobs Today' value={values?.newJobsToday} color='#ff0028' />
      </Grid>
      <Divider sx={{ height: 3, color: 'black', marginBlock: 10 }} />
      <Typography variant='h2' align='center'>
        {' '}
        All time Stats{' '}
      </Typography>
      <Grid container xs={12} spacing={2}>
        <MyCard title='No of New Agents Today' value={values?.totalAgents} color='#018338' />
        <MyCard title='No of New Users Today' value={values?.totalJobs} color='#f5bd00' />
        <MyCard title='No of New Nobs Today' value={values?.totalUsers} color='#ff0028' />
      </Grid>
    </Container>
  )
}

export default Dashboard
