import { registerUser } from '../api/index.jsx'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username && password && confirmPassword) {
      if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long')
      } else if (!username || !password || !confirmPassword) {
        setErrorMessage('Please fill out all fields')
      } else if (username.length < 3) {
        setErrorMessage('Username must be at least 3 characters long')
      } else if (password === confirmPassword) {
        setErrorMessage('')
        try {
          const response = await registerUser(username, password);
            navigate.push("/login");
            setErrorMessage('');
            return response
        } catch (error) {
          console.log(error);
        }
      } else {
        setErrorMessage('Passwords do not match')
      }

    }
  }

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    } else if (event.target.name === 'confirmPassword') {
      setConfirmPassword(event.target.value)
    }
  };

  localStorage.setItem('username', username)
  localStorage.setItem('password', password)


  return (
    <div className="login">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col text-center justify-center items-center p-0.5 m-0.5">
          <label htmlFor="username" className='p-0.5'>Username</label>
          <input type="text" name="username" value={username} onChange={handleChange} className="shadow-md bg-gray-200 rounded p-1 m-0.5" />
          <label htmlFor="password" className='p-0.5'>Password</label>
          <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded bg-gray-200 shadow-md p-1 m-0.5" />
          <label htmlFor="confirmPassword" className='p-0.5'>Confirm Password</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="rounded bg-gray-200 shadow-md p-1 m-0.5" />
          <button type="submit" className='p-0.5 m-1'>Register</button>
        </form>
        {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
      </div>
      <Link to="/">Already have an account? Login here</Link>
    </div>
  )
}

export default Register;
