import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Root from './routes/root.jsx'
import NewPost from './components/NewPost'
import Messages from './components/Messages'
import Profile from './components/Profile'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { 
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Register',
    element: <Register />, 
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/root',
    element: <Root />,
  }, 
  {
    path: '/NewPost',
    element: <NewPost />,
  },
  {
    path: '/Messages',
    element: <Messages />,
  },
  {
    path: '/Profile',
    element: <Profile />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
