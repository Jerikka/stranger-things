import { createPost } from "../api/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const NewPost = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);    

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(title, description, price, location, willDeliver);
        if (title && description && price && location && willDeliver) {
            try {
                const response = await createPost(
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                );
                console.log(response);
                navigate("/Home");
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
    };

    const handleCancel = () => {
        navigate("/Home");
    };


    return (
        <div className="newPost">
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col text-center justify-center items-center p-0.5 m-0.5"
                >
                    <label htmlFor="title" className='p-0.5'>
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        className="shadow-md bg-gray-200 rounded p-1 m-0.5"
                        required
                    />

                    <label
                        htmlFor="description"
                        className='p-0.5'>
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        className="rounded bg-gray-200 shadow-md p-1 m-0.5"
                        required
                    />

                    <label
                        htmlFor="price"
                        className='p-0.5'>
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        value={price}
                        onChange={handleChange}
                        className="rounded bg-gray-200 shadow-md p-1 m-0.5"
                        required
                    />

                    <label
                        htmlFor="location"
                        className='p-0.5'>
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleChange}
                        className="rounded bg-gray-200 shadow-md p-1 m-0.5"
                        required
                    />

                    <label
                        htmlFor="willDeliver"
                        className='p-0.5'>
                        Will Deliver?
                    </label>
                    <input
                        type="checkbox"
                        name="willDeliver"
                        value={willDeliver}
                        onChange={handleChange}
                        className="rounded bg-gray-200 shadow-md p-1 m-0.5" 
                    />

                    <button type="submit" className='p-0.5 m-1'>Submit</button>
                    <button type='submit' className='p-0.5 m-1 text-red-500' onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default NewPost;