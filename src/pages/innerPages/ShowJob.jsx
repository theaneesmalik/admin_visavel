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
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
const headStyle = {
  color: 'black',
  fontWeight: 'bold',
}
const getIcon = (bol) =>
  bol ? <CheckCircleRoundedIcon sx={{ color: 'green' }} /> : <CancelRoundedIcon sx={{ color: 'red' }} />
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
const ShowJob = () => {
  const [job, setJob] = useState({})
  const navigate = useNavigate()
  const [del, setDel] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setJob(location.state)
  }, [])
  const handleDel = async (id) => {
    const requestOptions = {
      method: 'delete',
      url: '/jobs',
      data: { id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('agentAuthToken')}`,
      },
    }
    await axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          navigate('/jobs')
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
      url: '/jobs',
      data: { id: job._id, role: 'job', data: { status: !job.status } },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('agentAuthToken')}`,
      },
    }
    axios
      .request(requestOptions)
      .then((result) => {
        if (result.data) {
          setJob(result.data)
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
            Job Detail
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Account Status: </Typography>
            <Switch checked={job.status} onChange={handleStatus} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/jobs')} variant='contained'>
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
          <Table sx={{ fontSize: '1.7vh', width: 'sm' }}>
            <TableRow>
              <TableCell sx={headStyle}>Title :</TableCell>
              <TableCell>{job.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Place of Duty : </TableCell>
              <TableCell>{`${job?.city} ${job?.country}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Deadline to apply : </TableCell>
              <TableCell>{formatDate(job?.deadline)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Age Range : </TableCell>
              <TableCell>{`${job?.minAge} - ${job.maxAge}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Salary Range : </TableCell>
              <TableCell>{`${job?.minSalary} - ${job.maxSalary}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>No of Jobs : </TableCell>
              <TableCell>{job?.noOfJobs}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Type : </TableCell>
              <TableCell>{job?.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Accommodation : </TableCell>
              <TableCell>{getIcon(job?.accommodation)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Food : </TableCell>
              <TableCell>{getIcon(job?.food)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Insurance : </TableCell>
              <TableCell>{getIcon(job?.insurance)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Medical : </TableCell>
              <TableCell>{getIcon(job?.medical)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Ticket : </TableCell>
              <TableCell>{getIcon(job?.ticket)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headStyle}>Transpotation : </TableCell>
              <TableCell>{getIcon(job?.transpotation)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={headStyle}>Posting Date : </TableCell>
              <TableCell>{formatDate(job?.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...headStyle, borderBottom: 0 }}>Last Updated: </TableCell>
              <TableCell>{formatDate(job?.updatedAt)}</TableCell>
            </TableRow>
          </Table>
        </Paper>
      </Container>
      {del && (
        <MyDialog
          title='Confirm'
          des={`Are you sure you want to delete ${job?.title}?`}
          actions={[
            {
              onClick: () => {
                handleDel(job?._id)
                return navigate('/jobs')
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

export default ShowJob
