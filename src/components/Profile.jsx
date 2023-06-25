import { fetchUser } from "../api";
import { fetchPosts } from "../api";
import { editPost } from "../api";
import { deletePost } from "../api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//create function to fetch user data and let the user edit their posts
const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetchUser(token).then((data) => {
            setUser(data);
        });
    }
        , []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetchPosts(token).then((data) => {
            setPosts(data);
        });
    }
        , []);

    const handleEdit = async (event) => {
        event.preventDefault();
        console.log(title, description, price, location);
        if (title && description && price && location) {
            try {
                const response = await editPost(
                    title,
                    description,
                    price,
                    location
                );
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setWillDeliver(checked);
        } else {
            if (name === "title") {
                setTitle(value);
            } else if (name === "description") {
                setDescription(value);
            } else if (name === "price") {
                setPrice(value);
            } else if (name === "location") {
                setLocation(value);
            }
        }
    }

    return (
        <div className="profile">
            <div className="profile__user">
                <h2>{user.username}</h2>
                <h3>{user.account.createdAt}</h3>
            </div>
            <div className="profile__posts">
                <h2>Posts</h2>
                {posts.map((post) => {
                    return (
                        <>
                            <div className="profile__post" key={post._id}>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <p>{post.price}</p>
                                <p>{post.location}</p>
                                <p>{post.willDeliver}</p>
                                <p>{post.author.username}</p>
                                <Link to={`/posts/${post._id}`}>
                                <button onClick={() => deletePost(post._id)}>Delete</button>
                                </Link>
                                <Link to={`/posts/${post._id}`}>
                                <button onClick={() => editPost(post._id)}>Edit</button>
                                </Link>
                            </div>
                            <div className="profile__edit">
                                <form onSubmit={handleEdit}>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={price}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={location}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="willDeliver">Will Deliver</label>
                                    <input
                                        type="checkbox"
                                        name="willDeliver"
                                        checked={willDeliver}
                                        onChange={handleChange}
                                    />
                                    <button type="submit">Edit Post</button>
                                </form>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Profile;