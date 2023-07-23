import { useState } from 'react';
import { loginUser } from '../api/index.jsx'
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(username, password);
        if (username && password) {
            try {
                const response = await loginUser(username, password);
                    setIsLoggedIn(true)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('password', response.data.password)
                    console.log(response);
                    navigate.push("/Home");
            } catch (error) {
                console.log(error);
            }

        } else {
            setErrorMessage('Incorrect username or password')
        }
    }

    const handleChange = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value)
        } else if (event.target.name === 'password') {
            setPassword(event.target.value)
        }
    };


    if (isLoggedIn) {
        return navigate.push("/Home")
    }

    return (
        <div className="login">
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col text-center justify-center items-center p-0.5 m-0.5">
                    <label htmlFor="username" className='p-0.5'>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className="shadow-md bg-gray-200 rounded p-1 m-0.5" />
                    <label htmlFor="password" className='p-0.5'>Password</label>
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded bg-gray-200 shadow-md p-1 m-0.5" />
                    <button type="submit" className='p-0.5 m-1'>Login</button>
                </form>
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </div>
        </div>
    )
}

export default Login 
