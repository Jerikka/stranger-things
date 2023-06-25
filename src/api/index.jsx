const cohortName = "2303-ftb-mt-pt"
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}` 


export const fetchPosts = async () => {
    try {
        const response = await fetch(`${APIURL}/posts`);
        const result = await response.json();
        console.log(result);
        return result.data.posts;
    } catch (error) {
        console.error(error);
    }
}; 

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    username: {username},
                    password: {password},
                },
            }),
        });
        const result = await response.json();
        console.log(result);
        } catch (error) {
        console.error(error);
    }
}

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    username: {username},
                    password: {password},
                },
            }),
        });
        const result = await response.json();
        console.log(result);
        } catch (error) {
        console.error(error);
    }
}

export const fetchUser = async (token) => {
    try {
        const response = await fetch(`${APIURL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const createPost = async ( token, title, description, price, location, willDeliver) => {
    try {
        const response = await fetch(`${APIURL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                post: {
                    title: {title},
                    description: {description},
                    price: {price},
                    location: {location},
                    willDeliver: {willDeliver},
                },
            }),
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const editPost = async (token, title, description, price, location, willDeliver) => {
    try {
        const response = await fetch(`${APIURL}/posts`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                post: {
                    title: {title},
                    description: {description},
                    price: {price},
                    location: {location},
                    willDeliver: {willDeliver},
                },
            }),
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const deletePost = async (token) => {
    try {
        const response = await fetch(`${APIURL}/posts`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const createMessage = async (token, content) => {
    try {
        const response = await fetch(`${APIURL}/posts/${token}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message: {
                    content: {content},
                },
            }),
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchMessages = async (token) => {
    try {
        const response = await fetch(`${APIURL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}