/** @format */
import { styled } from '@mui/material/styles'

import {
  Button,
  createTheme,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { useEffect, useMemo, useState, useContext } from 'react'
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
let gRows = []

const headStyle = {
  color: 'black',
  fontWeight: 'bold',
}
const Jobs = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const [showUser, setShowUser] = useState({ status: false })
  const [del, setDel] = useState({ id: null, name: '' })
  const [rows, setRows] = useState(gRows)
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [query, setQuery] = useState('')
  const token = localStorage.getItem('authToken')

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    axios
      .get('secureCustomers.php', {
        cancelToken: source.token,
        headers: { Authorization: token },
      })
      .then((result) => {
        if (result.data.error === 'Expired token') {
          localStorage.clear()
          navigate('/login')
        }
        setRows(result.data)
      })
      .catch((error) => console.log(error))
    return () => {
      source.cancel()
    }
  }, [])
  const handleDel = async (id) => {
    let formData = new FormData()
    formData.append('toDel', id)
    await axios
      .post('delCustomer.php', formData, { headers: { Authorization: token } })
      .then((result) => {
        if (result.data.error === 'Expired token') {
          localStorage.clear()

          navigate('/login')
        }
        setShowUser({ status: false })
      })
      .catch((error) => console.log(error))
  }
  const filteredRows = useMemo(() => {
    return rows.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase())
    })
  }, [query, rows])

  const handleShow = (index) => {
    let user = filteredRows[index]
    setShowUser({
      status: true,
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cName: user.cName,
      cEmail: user.cEmail,
    })
  }
  const handleEdit = (index) => {
    let user = filteredRows[index]
    navigate('/clients/edit', { state: user })
  }

  return (
    <div className='centerTable'>
      <Paper sx={{ p: 2, width: '95%', pt: 0, overflow: 'auto', maxHeight: '93vh' }}>
        <>
          <div
            style={{
              background: 'white',
              position: 'sticky',
              height: '8vh',
              zIndex: '1',
              top: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              pl={1}
              display={'inline'}
              sx={{
                fontSize: '2.3vh',
                textDecoration: 'Underline',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              Jobs
            </Typography>
            <TextField
              display={isMobile ? 'none' : 'none'}
              value={query}
              variant='outlined'
              onChange={(e) => setQuery(e.target.value)}
              label='Search Jobs'
              sx={{
                display: isMobile ? 'none' : '',
                bgcolor: 'white',
                p: '0 !important',
              }}
            />
            <Button
              onClick={() => navigate('/clients/new')}
              variant='contained'
              color='success'
              sx={{ maxWidth: 200 }}
            >
              Post New Job
            </Button>
          </div>
          <Table sx={{ fontSize: '1.65vh' }}>
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
                <TableCell>Ser</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell sx={{ display: isMobile ? 'none' : '' }}>Email</TableCell>
                <TableCell sx={{ display: isMobile ? 'none' : '' }}>Cell No</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ marginTop: '10vh' }}>
              {filteredRows.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell sx={{ display: isMobile ? 'none' : '' }}>{row.email}</TableCell>
                  <TableCell sx={{ display: isMobile ? 'none' : '' }}>{row.phone}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'flex-start',
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
                      <Button
                        variant='contained'
                        onClick={() => handleEdit(index)}
                        sx={{ marginInline: 0.5, height: '20px', width: '50px', mb: '5px' }}
                      >
                        Edit
                      </Button>
                      {!isMobile && <Divider orientation='vertical' flexItem sx={{ marginInline: '5px' }} />}
                      <Button
                        onClick={() => {
                          setDel({ id: row.id, name: row.name })
                          return setOpenDialog(true)
                        }}
                        variant='contained'
                        color='error'
                        sx={{ marginInline: 0.5, height: '20px', width: '50px' }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRows.length === 0 && (
            <Typography sx={{ textAlign: 'center', fontSize: '2vh', margin: '4vh' }}>
              No Job with entered name.
            </Typography>
          )}
        </>
      </Paper>
    </div>
  )
}

export default Jobs
