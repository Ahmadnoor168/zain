import React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import "./auth.css"
import { NavLink } from 'react-router-dom';
import { loginUser } from "../../Redux/authAction"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import Axios

const Signin = () => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  console.log("isAuthenticated", isAuthenticated)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSave = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must contain at least 8 characters, including letters, numbers, and special characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      // Make API call using Axios
      axios.post('http://localhost:5000/api/login', { email, password })
        .then(response => {
          console.log('Response from server:', response.data);
          
          let uid = response.data.id
          let JWT = response.data.jwtToken
          let message = response.data.message
          

          
          dispatch(loginUser({ uid, JWT, message }));
        })
        .catch(error => {
          console.error('Error while logging in:', error);
          // Handle errors gracefully
        });
    }
  };

  return (
    <div className='authContainer'>
      <div className='authBox'>
        <p className='authText'>LOGIN</p>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          fullWidth
        />

        <FormControl sx={{ marginTop: "14px", marginBottom: "14px" }} fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            error={!!passwordError}
          />
          {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
        </FormControl>

        <Button variant="contained" color="primary" fullWidth className='authBtn' onClick={handleSave}>
          Save
        </Button>

        <p className='authAcount'>Do Not Have an Account: <NavLink to="/signup" style={{ color: "#189ce4", fontWeight: "700" }}>SignUp</NavLink></p>

      </div>
    </div>
  );
};

export default Signin;
