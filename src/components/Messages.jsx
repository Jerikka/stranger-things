import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/index.jsx';


const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            to,
            from,
            subject,
            body
        };
        const response = await sendMessage(message);
        setMessages(response.data);
    }

    const sendMessage = async (message) => {
        const response = await loginUser(message);
        return response;
    }

    const getMessages = async (username, password) => {
        const response = await loginUser(username, password);
        setMessages(response.data);
    }

    useEffect(() => {
        getMessages();
    }
        , []);

    const closePopUp = () => {
        setShowPopUp(false);
        setTo('');
        setFrom('');
        setSubject('');
        setBody('');
    }

    (showPopUp && (
        <>
            <div className='popup fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
                <div className="popup-content bg-white p-6 rounded shadow-lg">
                    <h1 className='text-xl font-bold mb-4'>New Message</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="to">To:</label>
                        <input
                            type="text"
                            className='shadow-sm bg-gray-200 rounded p-1 m-0.5'
                            id="to"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                        /><br />

                        <label htmlFor="from">From:</label>
                        <input
                            type="text"
                            className='shadow-md bg-gray-200 rounded p-1 m-0.5'
                            id="from"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            required
                        /><br />

                        <label htmlFor="subject">Subject:</label>
                        <input
                            type="text"
                            className='shadow-md bg-gray-200 rounded p-1 m-0.5'
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        /><br />

                        <label htmlFor="content">Body:</label><br />
                        <textarea
                            id="content"
                            className='shadow-md bg-gray-200 rounded p-1 m-0.5'
                            rows="5"
                            cols="50"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        ></textarea><br />

                        <button type="submit" value="Send" className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2'>Send It</button>
                        <button onClick={closePopUp} className="px-4 py-2 bg-blue-500 text-red rounded hover:bg-blue-700 mr-2">Cancel</button>
                    </form>
                </div>
            </div>
        </>
    ))

    return (
        <div>
            <div className='navbar'>
                <ul className='flex'>
                    <li><Link to='/Home' className='px-8 hover:text-blue-800'>Home</Link></li>
                    <li><Link to='/' className='px-8 hover:text-blue-800'>Logout</Link></li>
                    <li><button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex justify-end' onClick={() => setShowPopUp(true)}> New Message</button></li>
                </ul>
            </div>
            <div className="sidebar">
                <h2 className='text-2xl'>Messages</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message.subject}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default Messages;

