/** @format */
import { styled } from '@mui/material/styles'

import {
  Button,
  Container,
  createTheme,
  Divider,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import useFetch from '../hooks/useFetch'
import MyDialog from '../components/MyDialog'
import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/system'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

let theme = createTheme()

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const headStyle = {
  color: 'black',
  fontWeight: 'bold',
}
const Admins = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [del, setDel] = useState({ id: null, name: '' })
  const [rows, setRows] = useState([{}])
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [query, setQuery] = useState('')
  const { data, loading } = useFetch('/users/?role=admin')
  useEffect(() => {
    if (!loading) setRows(data)
  }, [data])
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
          setRows((prevRows) => prevRows.filter((row) => row._id !== id))
        }
      })
      .catch((error) => {
        console.log(error)
        const err = error.response.data.message
        console.log(err)
        if (err === 'Invalid / Expired token') {
          navigate('/login')
          localStorage.clear()
        } else if (err === 'Super admin profile cannot be deleted') alert(err)
      })
  }
  const filteredRows = useMemo(() => {
    if (!query) return rows
    return rows.filter((item) => {
      const firstNameMatch = item.firstName?.toLowerCase().includes(query.toLowerCase())
      const lastNameMatch = item.lastName?.toLowerCase().includes(query.toLowerCase())
      return firstNameMatch || lastNameMatch
    })
  }, [query, rows])

  const handleShow = (index) => {
    let admin = filteredRows[index]
    navigate('/admins/show', { state: admin })
  }
  const handleStatus = (index) => {
    const admin = filteredRows[index]
    if (admin.isSuper) {
      alert('Super admin proile cannot be deactivated')
      return
    }
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
          const rowIndex = rows.findIndex((row) => row._id === admin._id)
          setRows((prevRows) => {
            const updatedRows = [...prevRows]
            updatedRows[rowIndex].status = result.data.status
            return updatedRows
          })
        }
      })
      .catch((error) => {
        console.log(error)
        const err = error.response.data.message
        if (err === 'Invalid / Expired token') {
          navigate('/login')
          localStorage.clear()
        } else if (err === 'Super admin profile cannot be deleted or deactivated') alert(err)
      })
  }
  return (
    <div className='centerTable'>
      <Paper sx={{ p: 2, pt: 0, overflow: 'auto', maxHeight: '93vh' }}>
        <>
          <div
            style={{
              background: 'white',
              position: 'sticky',
              height: '8vh',
              zIndex: '1',
              top: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              pl={1}
              variant='h4'
              display={'inline'}
              sx={{
                textDecoration: 'Underline',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              Admins
            </Typography>
            <Container maxWidth='sm'>
              <TextField
                display={isMobile ? 'none' : 'none'}
                value={query}
                fullWidth
                variant='outlined'
                onChange={(e) => setQuery(e.target.value)}
                label='Search by Name'
                sx={{
                  display: isMobile ? 'none' : '',
                  bgcolor: 'white',
                  p: '0 !important',
                }}
              />
            </Container>
            <div></div>
            {/* <Button
              onClick={() => navigate('/clients/new')}
              variant='contained'
              color='success'
              sx={{ maxWidth: 200 }}
            >
              Post New Job
            </Button> */}
          </div>
          <Table sx={{ mt: 4, fontSize: '1.65vh' }}>
            <TableHead
              sx={{
                outline: '1px solid black',
                position: 'sticky',
                top: '8.1vh',
                background: 'white',
                zIndex: 1,
                borderRadius: '.3em',
              }}
            >
              <TableRow sx={headStyle}>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell sx={{ display: isMobile ? 'none' : '' }}>Mobile No</TableCell>
                <TableCell align='center'>Actions</TableCell>
                <TableCell sx={{ display: isMobile ? 'none' : '' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ marginTop: '10vh' }}>
              {filteredRows.map((row, index) => (
                <StyledTableRow key={row._id}>
                  <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell sx={{ display: isMobile ? 'none' : '' }}>{row.mobile}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        onClick={() => handleShow(index)}
                        variant='contained'
                        color='success'
                        sx={{ marginInline: 0.5, height: '20px', width: '50px', mb: '5px' }}
                      >
                        Show
                      </Button>
                      {!isMobile && <Divider orientation='vertical' flexItem sx={{ marginInline: '5px' }} />}
                      <Button
                        onClick={() => {
                          setDel({ id: row._id, name: `${row.firstName} ${row.lastName}` })
                          return setOpenDialog(true)
                        }}
                        variant='contained'
                        color='error'
                        sx={{ marginInline: 0.5, height: '20px', width: '50px' }}
                        disabled={row.isSuper}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: isMobile ? 'none' : '' }}>
                    <Switch
                      disabled={row.isSuper}
                      checked={row.status}
                      onChange={() => handleStatus(index)}
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRows.length === 0 && (
            <Typography sx={{ textAlign: 'center', fontSize: '2vh', margin: '4vh' }}>
              No Admin found
            </Typography>
          )}
        </>
      </Paper>
      {openDialog && (
        <MyDialog
          title='Confirm'
          des={`Are you sure you want to delete Admin ${del.name} profile?`}
          actions={[
            {
              onClick: () => {
                handleDel(del.id)
                return setOpenDialog(false)
              },
              color: 'error',
              text: 'Delete',
            },
            { onClick: () => setOpenDialog(false), color: 'primary', text: 'Cancel' },
          ]}
        />
      )}
    </div>
  )
}

export default Admins
