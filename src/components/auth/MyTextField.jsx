import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const MyTextField = ({ errors, type, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)
  //  label, name, autoComplete, type, margin, autoFocus
  return (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        type={type && type === 'password' ? (showPassword ? 'text' : 'password') : type}
        {...rest}
        error={errors?.length > 0 && true}
        helperText={
          errors && (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
              {errors?.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )
        }
        InputProps={
          type === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </Grid>
  )
}

export default MyTextField
