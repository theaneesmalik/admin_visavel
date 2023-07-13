/** @format */

import {
  Avatar,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Switch,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import MyDialog from '../../components/MyDialog'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
const headStyle = {
  color: 'black',
  fontWeight: 'bold',
}
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
const ShowUser = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [del, setDel] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setUser(location.state)
  }, [])
  const handleDel = async (id) => {
    const requestOptions = {
      method: 'delete',
      url: '/users',
      data: { id, role: 'user' },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
      },
    }
    await axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          navigate('/users')
        }
      })
      .catch((error) => {
        console.log(error)
        const err = error.response.data.message === 'Invalid / Expired token'
        if (err) {
          navigate('/login')
          localStorage.clear()
        }
      })
  }
  const handleStatus = () => {
    const requestOptions = {
      method: 'put',
      url: '/users',
      data: { id: user._id, role: 'user', data: { status: !user.status } },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
      },
    }
    axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          setUser(result.data)
        }
      })
      .catch((error) => {
        console.log(error)
        const err = error.response.data.message === 'Invalid / Expired token'
        if (err) {
          navigate('/login')
          localStorage.clear()
        }
      })
  }

  return (
    <>
      <Paper elevation={5} sx={{ p: 1, overflow: 'auto' }}>
        <Stack
          gap={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            paddingBlock: 1,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Typography
            pl={1}
            variant='h4'
            display={'inline'}
            sx={{
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}
          >
            User Detail
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Account Status: </Typography>
            <Switch checked={user.status} onChange={handleStatus} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/users')} variant='contained'>
              Back to List
            </Button>
            <Divider orientation='vertical' flexItem sx={{ marginInline: '5px' }} />
            <Button
              type='submit'
              onClick={() => {
                return setDel(true)
              }}
              variant='contained'
              color='error'
              // sx={{ marginInline: '5px', fontSize: '1vh' }}
            >
              Delete
            </Button>
          </div>
        </Stack>
      </Paper>
      <Container sx={{ paddingInline: 0, mt: 1 }} component='main' maxWidth='sm'>
        <Paper sx={{ paddingTop: 1 }} elevation={5}>
          <Avatar
            alt='Profile Picture'
            src={user.profile && `${axios.defaults.baseURL}images/${user.profile}`}
            sx={{ width: '10em', height: '10em', m: '0 auto', marginBlock: 5 }}
          />
          <Table sx={{ fontSize: '1.7vh', width: 'sm' }}>
            <TableRow>
              <TableCell sx={headStyle}>Name :</TableCell>
              <TableCell>{`${user?.firstName} ${user?.lastName}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Email : </TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Mobile No : </TableCell>
              <TableCell>{user?.mobile}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Username : </TableCell>
              <TableCell>{user?.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Phone No: </TableCell>
              <TableCell>{user?.phone}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={headStyle}> Office Address: </TableCell>
              <TableCell>{`${user?.address}, ${user?.city}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Joining : </TableCell>
              <TableCell>{formatDate(user?.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...headStyle, borderBottom: 0 }}>Last Updated: </TableCell>
              <TableCell>{formatDate(user?.updatedAt)}</TableCell>
            </TableRow>
          </Table>
        </Paper>
      </Container>
      {del && (
        <MyDialog
          title='Confirm'
          des={`Are you sure you want to delete ${user?.firstName} ${user?.lastName} profile?`}
          actions={[
            {
              onClick: () => {
                handleDel(user?._id)
                return navigate('/users')
              },
              color: 'error',
              text: 'Delete',
            },
            { onClick: () => setDel(false), color: 'primary', text: 'Cancel' },
          ]}
        />
      )}
    </>
  )
}

export default ShowUser
