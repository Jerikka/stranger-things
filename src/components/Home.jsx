import { fetchPosts } from '../api/index.jsx';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            setPosts(await fetchPosts());
        }
        fetchAPI();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <div className="home" >
                <nav className="home-nav">
                    <Link to="/newpost" className='px-8'>New Post</Link>
                    <Link to="/messages" className='px-8'>Messages</Link>
                    <Link to="/profile" className='px-8'>Profile</Link>
                    <Link to="/" className='px-8'>Logout</Link>
                </nav>

                <div className="home-search">
                    <input className="home-search-input px-4 py-2 mr-4 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-700"
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={handleSearch} />
                    <button className="home-search-button">Search</button>
                </div>


                <div className="home-header">
                    <h1 className="home-title px-2 mb-2">Welcome to Strangers Things</h1>
                    <h2 className="home-description px-4 mb-8 text-xl">Here is where you left off:</h2>

                    <div className="home-posts">
                        {filteredPosts.map((post) => {
                            return (
                                <div className="home-post   flex flex-row flex-wrap items-center mx-8 my-4 basis-2 max-w-sm p-6 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={post._id}>
                                    <Link to={`/posts/${post._id}`}>
                                        <h3 className="home-post-title  mb-2 text-md font-bold tracking-tight border-b-4 border-slate-200 text-gray-900 dark:text-white capitalize">{post.title}</h3>
                                    </Link>
                                    <p className="home-post-description mb-2">{post.description}</p>
                                    <p className="home-post-price mr-4"><strong>Price</strong>: {post.price}</p>
                                    <p className="home-post-location"><strong>Location</strong>: {post.location}</p>
                                    <p className="home-post-author mr-6 "><strong>Will Deliver</strong>: {post.willDeliver}</p>
                                    <p className="home-post-author"><strong>Author</strong>: {post.author.username}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;