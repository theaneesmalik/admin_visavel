import { Button, Grid, Paper, Stack, Tabs, Typography, Box, Tab, Alert, Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function formatDate(dateTimeString) {
  const date = new Date(dateTimeString)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  const formattedDate = `${months[monthIndex]} ${day}, ${year}`

  return formattedDate
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const id = localStorage.getItem('adminId')
  const { data, loading } = useFetch(`/users/${id}?role=admin`)
  const [value, setValue] = useState(0)
  useEffect(() => setProfile(data), [data])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Paper sx={{ flexGrow: 1, p: 5 }}>
      {!profile.isCemplete && (
        <Alert severity='warning' sx={{ marginBottom: 3 }}>
          Incomplete Profile - Click Edit Profile Button to Complete your profile
        </Alert>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          {/* <img src='https://source.unsplash.com/200x200/?man-in-suit-profile' alt='Profile picture' /> */}
          <Avatar
            alt='Profile Picture'
            src={profile.profile && `${axios.defaults.baseURL}images/${profile.profile}`}
            sx={{ width: '15em', height: '15em', m: '0 auto' }}
          />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item xs={12} md={8}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography
              gutterBottom
              variant='h3'
              color={'hsl(205.71deg 4.24% 32.35%)'}
            >{`${profile?.firstName} ${profile?.lastName}`}</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={() => navigate('/profile/edit', { state: profile })} variant='contained'>
                Edit Profile
              </Button>
            </div>
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Personal' />
              <Tab label='Professional' />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <table>
              <tr>
                <td>Username:</td>
                <td>{profile?.username}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{profile?.email}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>{profile?.mobile}</td>
              </tr>
            </table>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <table>
              <tr>
                <td>Address:</td>
                <td>{`${profile?.address ? profile?.address : ''}, ${profile?.city ? profile?.city : ''}, ${
                  profile?.province ? profile?.province : ''
                }, ${profile?.country ? profile?.country : ''} `}</td>
              </tr>
              <tr>
                <td>Added By:</td>
                <td>{profile?.addedBy}</td>
              </tr>
              <tr>
                <td>Joining:</td>
                <td>{formatDate(profile?.createdAt)}</td>
              </tr>
            </table>
          </CustomTabPanel>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Profile
