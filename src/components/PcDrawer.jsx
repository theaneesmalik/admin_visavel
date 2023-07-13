/** @format */

import { useState } from 'react'
import logo from '../assets/logo.png'
import { styled } from '@mui/material/styles'
import {
  Box,
  List,
  CssBaseline,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useLocation, useNavigate } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'

const drawerWidth = 250

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  const location = useLocation()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant='permanent' open={open} onMouseOver={handleDrawerOpen} onMouseOut={handleDrawerClose}>
        <DrawerHeader>
          <img className='logo' src={logo} alt='Visavel.com Logo' />
          {open && (
            <Typography
              variant='h4'
              sx={{
                position: 'fixed',
                left: 75,
              }}
            >
              Visavel
            </Typography>
          )}
        </DrawerHeader>
        <List>
          <ListItem
            className={location.pathname === '/' ? 'active' : ''}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/')
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            className={
              location.pathname === '/jobs' || location.pathname.startsWith('/jobs' + '/') ? 'active' : ''
            }
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/jobs')
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <WorkRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Jobs' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            className={
              location.pathname === '/agents' || location.pathname.startsWith('/agents' + '/') ? 'active' : ''
            }
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/agents')
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PeopleAltRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Agents' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            className={
              location.pathname === '/users' || location.pathname.startsWith('/users' + '/') ? 'active' : ''
            }
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/users')
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <GroupsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Users' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            className={
              location.pathname === '/admins' || location.pathname.startsWith('/admins' + '/') ? 'active' : ''
            }
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/admins')
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <EngineeringRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Admins' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        <List sx={{ marginTop: 'auto' }}>
          {/* <ListItem
            disablePadding
            sx={{ display: 'block' }}
            className={location.pathname === '/support' ? 'active' : ''}
          >
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/support')
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SupportAgentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Support' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            // className={location.pathname === '/profile' ? 'active' : ''}
            className={
              location.pathname === '/profile' || location.pathname.startsWith('/profile' + '/')
                ? 'active'
                : ''
            }
          >
            <ListItemButton
              onClick={() => {
                handleDrawerClose()
                navigate('/profile')
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Profile' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <form onSubmit={handleLogout}>
              <ListItemButton
                type='submit'
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </form>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}
