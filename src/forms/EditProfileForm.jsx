import { Avatar, Box, Button, Grid, Link, Paper, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MyTextField from '../components/auth/MyTextField'
import axios from 'axios'
import useFetch from '../hooks/useFetch'

const EditProfileForm = ({ onSubmit, errors, isLoading, profile }) => {
  // const [loc, setloc] = useState({})
  const [img, setimg] = useState(profile.profile && `${axios.defaults.baseURL}images/${profile.profile}`)
  const imgRef = useRef()
  const provRef = useRef()
  const cityRef = useRef()
  const postalRef = useRef()
  const { data: loc } = useFetch('https://ipinfo.io/json?token=45022df7aed476')
  useEffect(() => {
    !profile?.province && (provRef.current.value = loc.region)
    !profile?.city && (cityRef.current.value = loc.city)
    !profile?.postal && (postalRef.current.value = loc.postal)
  }, [loc])
  const handleImgChange = () => {
    setimg(URL.createObjectURL(imgRef.current.files[0]))
  }
  return (
    <Box component='form' onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Stack spacing={3} alignItems='center' sx={{ width: '100%' }}>
          <Avatar
            alt='Profile Picture'
            // src='https://source.unsplash.com/random'
            src={img}
            sx={{ width: 200, height: 200, m: '0 auto' }}
          />

          <input
            accept='image/*'
            style={{ display: 'none' }}
            name='profile'
            onChange={handleImgChange}
            ref={imgRef}
            id='raised-button-file'
            type='file'
          />
          <label htmlFor='raised-button-file'>
            <Button variant='contained' color='success' component='span'>
              Change Profile Picture
            </Button>
          </label>
        </Stack>
        <MyTextField
          defaultValue={profile?.firstName}
          name='firstName'
          label='First Name'
          errors={errors?.firstName}
        />
        <MyTextField
          defaultValue={profile?.lastName}
          name='lastName'
          label='Last Name'
          errors={errors?.lastName}
        />
        <MyTextField
          defaultValue={profile?.username}
          label='Username'
          name='username'
          errors={errors?.username}
        />
        <MyTextField
          defaultValue={profile?.email}
          label='Email'
          name='email'
          errors={errors?.email}
          autoComplete='email'
        />
        <MyTextField
          defaultValue={profile?.mobile}
          label='Mobile No'
          name='mobile'
          errors={errors?.mobile}
          autoComplete='mobile'
        />
        <MyTextField
          label='Country'
          name='country'
          defaultValue={profile?.country ? profile?.country : 'Pakistan'}
        />
        <MyTextField
          label='Province'
          name='province'
          inputRef={provRef}
          defaultValue={profile?.province}
          // value={profile?.province ? profile?.province : loc.province}
        />
        <MyTextField inputRef={cityRef} label='City' name='city' defaultValue={profile?.city} />
        <MyTextField label='Post Code' name='postal' inputRef={postalRef} defaultValue={profile?.postal} />
        <MyTextField label='Address' name='address' defaultValue={profile?.address} />
      </Grid>
      <Button disabled={isLoading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Update
      </Button>
    </Box>
  )
}

export default EditProfileForm
