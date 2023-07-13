/** @format */

import { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'

const drawerWidth = 200

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))
// const iconStyle = { width: '1.5em', height: '1.5em' }

export default function MobileDrawer() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{ bgcolor: 'rgb(0 175 239)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant='h6' noWrap component='div'>
            Vidavel Agent
          </Typography>

          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose()
                  handleDrawerClose()
                  navigate('/profile')
                }}
              >
                <AccountCircle sx={{ mr: 2 }} />
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.clear()
                  navigate('/login')
                }}
              >
                <LogoutRoundedIcon sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display={'flex'} alignItems={'center'}>
            <img style={{ width: '50px', display: 'inline' }} src={logo} alt='Visavel Logo' />
            <Typography
              variant='h5'
              sx={{
                position: 'fixed',
                left: 75,
                lineHeight: 1,
              }}
            >
              Vidavel
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/')
              }}
            >
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/jobs')
              }}
            >
              <ListItemIcon>
                <WorkRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Jobs' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/agents')
              }}
            >
              <ListItemIcon>
                <PeopleAltRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Agents' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/users')
              }}
            >
              <ListItemIcon>
                <GroupsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/admins')
              }}
            >
              <ListItemIcon>
                <EngineeringRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Admins' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/support')
              }}
            >
              <ListItemIcon>
                <SupportAgentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Support' />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
    </Box>
  )
}
