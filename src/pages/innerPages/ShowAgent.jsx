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
const ShowAgent = () => {
  const [agent, setAgent] = useState({})
  const navigate = useNavigate()
  const [del, setDel] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setAgent(location.state)
  }, [])
  const handleDel = async (id) => {
    const requestOptions = {
      method: 'delete',
      url: '/users',
      data: { id, role: 'agent' },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
      },
    }
    await axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          navigate('/agents')
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
      data: { id: agent._id, role: 'agent', data: { status: !agent.status } },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
      },
    }
    axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          setAgent(result.data)
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
            Agent Detail
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Account Status: </Typography>
            <Switch checked={agent.status} onChange={handleStatus} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/agents')} variant='contained'>
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
            src={agent.profile && `${axios.defaults.baseURL}images/${agent.profile}`}
            sx={{ width: '10em', height: '10em', m: '0 auto', marginBlock: 5 }}
          />
          <Table sx={{ fontSize: '1.7vh', width: 'sm' }}>
            <TableRow>
              <TableCell sx={headStyle}>Name :</TableCell>
              <TableCell>{`${agent?.firstName} ${agent?.lastName}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Email : </TableCell>
              <TableCell>{agent?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Mobile No : </TableCell>
              <TableCell>{agent?.mobile}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Username : </TableCell>
              <TableCell>{agent?.username}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={headStyle}>Company Name: </TableCell>
              <TableCell>{agent?.company}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Phone No: </TableCell>
              <TableCell>{agent?.phone}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={headStyle}> Office Address: </TableCell>
              <TableCell>{`${agent?.address}, ${agent?.city}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Joining : </TableCell>
              <TableCell>{formatDate(agent?.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Licence : </TableCell>
              <TableCell>{agent?.licence}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...headStyle, borderBottom: 0 }}>Last Updated: </TableCell>
              <TableCell>{formatDate(agent?.updatedAt)}</TableCell>
            </TableRow>
          </Table>
        </Paper>
      </Container>
      {del && (
        <MyDialog
          title='Confirm'
          des={`Are you sure you want to delete ${agent?.firstName} ${agent?.lastName} profile?`}
          actions={[
            {
              onClick: () => {
                handleDel(agent?._id)
                return navigate('/agents')
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

export default ShowAgent
