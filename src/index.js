import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.headers = { 'Content-Type': 'application/json' }
const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
