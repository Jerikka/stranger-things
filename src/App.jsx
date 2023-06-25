import { Link } from 'react-router-dom'
import { Login } from './components/Login'


function App() {


  return (
    <>
      <div className='flex flex-col px-10 py-10 '>
        <h2 className='text-blue-600 block m-auto pl-0.5 shadow-black-200 my-2.5'>Welcome to the Best Kept Secret</h2>
        <p className='text-blue-600 block m-auto pl-0.5 shadow-gray-200 text-md'>Please Login or Create an Account to Continue</p>
        <Login />
        <Link to='/Register' className='text-blue-600 pl-0.5 shadow-gray-200 text-md'>Create an Account</Link>
      </div>
    </>
  )
}

export default App
