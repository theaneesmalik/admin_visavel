import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import EditProfileForm from '../../forms/EditProfileForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
function printForm(formData) {
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`)
    if (key === 'profile') {
      console.log(value)
    }
  }
}
export default function EditProfile() {
  const [isLoading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const profile = location.state
  !profile && navigate('/profile')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.currentTarget)
    data.append('role', 'admin')
    data.append('id', localStorage.getItem('adminId'))
    const file = e.currentTarget.profile.files[0]
    if (file) {
      data.set('profile', file)
    }
    // printForm(data)
    axios
      .post('/users', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        res.data && navigate('/profile')
      })
      .catch((error) => {
        const err = error.response.data.message === 'Invalid / Expired token'
        if (err) {
          navigate('/login')
          localStorage.clear()
        }
        console.log(err)
      })
  }
  return (
    <>
      <CssBaseline />
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            Edit Profile
          </Typography>
          <EditProfileForm onSubmit={handleSubmit} isLoading={isLoading} profile={profile} />
        </Paper>
      </Container>
    </>
  )
}
