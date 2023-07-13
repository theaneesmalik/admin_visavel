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
const ShowAdmin = () => {
  const [admin, setAdmin] = useState({})
  const navigate = useNavigate()
  const [del, setDel] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setAdmin(location.state)
  }, [])
  const handleDel = async (id) => {
    const requestOptions = {
      method: 'delete',
      url: '/users',
      data: { id, role: 'admin' },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
      },
    }
    await axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          navigate('/admins')
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
      data: { id: admin._id, role: 'admin', data: { status: !admin.status } },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
      },
    }
    axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          setAdmin(result.data)
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
            Admin Detail
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Account Status: </Typography>
            <Switch disabled={admin.isSuper} checked={admin.status} onChange={handleStatus} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/admins')} variant='contained'>
              Back to List
            </Button>
            <Divider orientation='vertical' flexItem sx={{ marginInline: '5px' }} />
            <Button
              type='submit'
              onClick={() => {
                return setDel(true)
              }}
              disabled={admin.isSuper}
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
            src={admin.profile && `${axios.defaults.baseURL}images/${admin.profile}`}
            sx={{ width: '10em', height: '10em', m: '0 auto', marginBlock: 5 }}
          />
          <Table sx={{ fontSize: '1.7vh', width: 'sm' }}>
            <TableRow>
              <TableCell sx={headStyle}>Name :</TableCell>
              <TableCell>{`${admin?.firstName} ${admin?.lastName}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Email : </TableCell>
              <TableCell>{admin?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Mobile No : </TableCell>
              <TableCell>{admin?.mobile}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Username : </TableCell>
              <TableCell>{admin?.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Mobile No: </TableCell>
              <TableCell>{admin?.mobile}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={headStyle}> Office Address: </TableCell>
              <TableCell>{`${admin?.address}, ${admin?.city}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Joining : </TableCell>
              <TableCell>{formatDate(admin?.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...headStyle, borderBottom: 0 }}>Last Updated: </TableCell>
              <TableCell>{formatDate(admin?.updatedAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...headStyle, borderBottom: 0 }}>Added By : </TableCell>
              <TableCell>{admin?.addedBy}</TableCell>
            </TableRow>
          </Table>
        </Paper>
      </Container>
      {del && (
        <MyDialog
          title='Confirm'
          des={`Are you sure you want to delete ${admin?.firstName} ${admin?.lastName} profile?`}
          actions={[
            {
              onClick: () => {
                handleDel(admin?._id)
                return navigate('/admins')
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

export default ShowAdmin
