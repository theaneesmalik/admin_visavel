function verifyEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(input)
}

export const validate = (fd) => {
  let isValid = true
  const updatedErrors = {}
  let fieldErrors = []

  // Validation logic for firstName
  if (!fd.get('firstName')) {
    fieldErrors.push('First Name is required.')
    isValid = false
  }
  if (fd.get('firstName').length < 3) {
    fieldErrors.push('First Name must be at least 3 characters long.')
    isValid = false
  }
  if (!/^[a-zA-Z]+$/.test(fd.get('firstName'))) {
    fieldErrors.push('First Name must contain only alphabets.')
    isValid = false
  }
  updatedErrors.firstName = fieldErrors

  // Validation logic for lastName
  fieldErrors = []
  if (!fd.get('lastName')) {
    fieldErrors.push('Last Name is required.')
    isValid = false
  }
  if (fd.get('lastName').length < 3) {
    fieldErrors.push('Last Name must be at least 3 characters long.')
    isValid = false
  }
  if (!/^[a-zA-Z]+$/.test(fd.get('lastName'))) {
    fieldErrors.push('Last Name must contain only alphabets.')
    isValid = false
  }
  updatedErrors.lastName = fieldErrors

  // Validation logic for username
  fieldErrors = []
  if (!fd.get('username')) {
    fieldErrors.push('Username is required.')
    isValid = false
  }
  if (fd.get('username').length < 3) {
    fieldErrors.push('Username must be at least 3 characters long.')
    isValid = false
  }
  if (fd.get('username').length > 20) {
    fieldErrors.push('Username must be less than 20 characters.')
    isValid = false
  }
  if (!/^[a-z0-9-]+$/.test(fd.get('username'))) {
    fieldErrors.push('Username must contain only lowercase alphabets, numbers, and hyphen (-).')
    isValid = false
  }
  updatedErrors.username = fieldErrors

  fieldErrors = []
  // Validation logic for email
  if (!fd.get('email')) {
    fieldErrors.push('Email is required.')
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(fd.get('email'))) {
    fieldErrors.push('Invalid email format.')
    isValid = false
  }
  updatedErrors.email = fieldErrors

  // Validation logic for mobile
  fieldErrors = []
  if (!fd.get('mobile')) {
    fieldErrors.push('Mobile number is required.')
    isValid = false
  }
  if (fd.get('mobile').length !== 11 || !/^03[0-4]\d{8}$/.test(fd.get('mobile'))) {
    fieldErrors.push('Mobile number must be 11 digits long.')
    isValid = false
  }
  if (!/^03[0-4]\d{8}$/.test(fd.get('mobile'))) {
    fieldErrors.push('Mobile number must start with 03, and the third digit should be between 0 to 4.')
    isValid = false
  }
  updatedErrors.mobile = fieldErrors

  // Validation logic for password
  fieldErrors = []
  if (!fd.get('password')) {
    fieldErrors.push('Password is required.')
    isValid = false
  }
  if (fd.get('password').length < 8) {
    fieldErrors.push('Password must be at least 8 characters long.')
    isValid = false
  }
  //   if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(fd.get('password'))) {
  //     fieldErrors.push(
  //       'Password must include a mix of uppercase and lowercase letters, numbers, and special characters.'
  //     )
  //     isValid = false
  //   }
  updatedErrors.password = fieldErrors
  return { isValid, updatedErrors }
}

export const loginValidate = (fd) => {
  let isValid = true
  const updatedErrors = {}
  let fieldErrors = []

  // validation for user
  if (!fd.get('user')) {
    fieldErrors.push('Username is required.')
    isValid = false
  }
  const isEmail = verifyEmail(fd.get('user'))
  if (isEmail) {
    // email validations
    if (!fd.get('user')) {
      fieldErrors.push('Email is required.')
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(fd.get('user'))) {
      fieldErrors.push('Invalid email format.')
      isValid = false
    }
  } else {
    // username validations
    if (fd.get('user').length < 3) {
      fieldErrors.push('Username must be at least 3 characters long.')
      isValid = false
    }
    if (fd.get('user').length > 20) {
      fieldErrors.push('Username must be less than 20 characters.')
      isValid = false
    }
    if (!/^[a-z0-9-]+$/.test(fd.get('user'))) {
      fieldErrors.push('Username must contain only lowercase alphabets, numbers, and hyphen (-).')
      isValid = false
    }
  }
  updatedErrors.user = fieldErrors

  // Validation logic for password
  fieldErrors = []
  if (!fd.get('password')) {
    fieldErrors.push('Password is required.')
    isValid = false
  }
  if (fd.get('password').length < 8) {
    fieldErrors.push('Password must be at least 8 characters long.')
    isValid = false
  }
  //   if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(fd.get('password'))) {
  //     fieldErrors.push(
  //       'Password must include a mix of uppercase and lowercase letters, numbers, and special characters.'
  //     )
  //     isValid = false
  //   }
  updatedErrors.password = fieldErrors
  return { isValid, updatedErrors, isEmail }
}
