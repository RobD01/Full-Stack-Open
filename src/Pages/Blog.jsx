import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar";
import InfoToggle from "../Components/InfoToggle";
import { useState, useEffect } from "react";
import {
  getAll,
  create,
  update,
  deleteItem,
  setToken,
} from "../services/blog.js";
import login from "../services/login";

const Blog = () => {
  // States

  // Blog Form
  const [blogList, setBlogList] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  // Login Form
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Forms handler #####

  // Login
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // Post request on backend, and adding name into frontend table
  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes,
    };

    if (!blogObject.title) {
      alert("Error: missing title");
    } else if (isNaN(blogObject.likes)) {
      alert("Error: Likes can only be numbers");
    } else {
      create(blogObject).then((returnedItem) => {
        setBlogList(blogList.concat(returnedItem));
        handleClear();
      });
    }
  };

  // Add new post
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrl = (event) => {
    setUrl(event.target.value);
  };
  const handleLikes = (event) => {
    setLikes(event.target.value);
  };

  // Clear Form
  const handleClear = (event) => {
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };

  // Delete request on backend, and delete name from frontend table
  const handleDelete = (id, name) => {
    deleteItem(id);
    setBlogList(
      blogList.filter((blog) => {
        return blog.id !== id;
      })
    );
  };

  // Put request on backend, and update name from frontend table
  const handleUpdate = (id) => {
    const blogObject = {
      title,
      author,
      url,
      likes,
    };

    if (!blogObject.title) {
      alert("Error: missing title");
    } else if (isNaN(blogObject.likes)) {
      alert("Error: Likes can only be numbers");
    } else {
      update(id, blogObject);
    }

    const newState = blogList.map((blog) => {
      // 👇️ if id equals 2 replace object
      if (blog.id === id) {
        return blogObject;
      }

      // 👇️ otherwise return object as is
      return blog;
    });

    setBlogList(newState);
  };

  // Backend  #####

  // Log in user
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("Wrong credentials");
      setTimeout(() => {}, 1000);
    }
    console.log("handleLogin complete", username, password);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  // Get blog data
  useEffect(() => {
    getAll().then((initialPersons) => {
      setBlogList(initialPersons);
    });
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  // Front end #####

  const blogForm = () => {
    return (
      <Form className="my-5">
        <h5>Add New Post</h5>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={handleAuthor}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={handleUrl}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Likes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Likes"
            value={likes}
            onChange={handleLikes}
          />
        </Form.Group>

        <div>
          <Button variant="primary" type="submit" onClick={addBlog}>
            Submit
          </Button>
          <Button
            variant="warning"
            className="mx-5"
            type="submit"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </Form>
    );
  };

  const loginForm = () => {
    return (
      <Form className="my-5" onSubmit={handleLogin}>
        <h5>Log in</h5>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsername}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>

        <div>
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Log in
          </Button>
        </div>
      </Form>
    );
  };

  const render = !user
    ? null
    : blogList.map((blog) => (
        <tr key={blog.title}>
          <td> {blog.title}</td>
          <td> {blog.author}</td>
          <td>
            <Button
              variant="secondary"
              onClick={(e) => handleUpdate(blog.id, e)}
            >
              Update
            </Button>
          </td>
          <td>
            <Button
              variant="danger"
              onClick={(e) => handleDelete(blog.id, blog.name, e)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ));

  return (
    <div className="container">
      <Navigation />
      {/* Intro */}
      <h2 className="text-center">Blog App</h2>
      {/* Toggle info section */}
      <InfoToggle
        function="User login with token authentication (using JWT). 
        Persistant storage with backend services (deployed on Render). Front-end connected directed to 
        the API hosted on Render. First log in,
        and then you can post/edit/delete blog posts            
            "
        concept="CRUD axios request, JWT token authentication"
      />
      {/* Forms */}
      {!user ? (
        loginForm()
      ) : (
        <div>
          <h2>Welcome {user.name}</h2>
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
          {blogForm()}
        </div>
      )}

      {/* Table results */}
      <h3>Blog Posts</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>{render}</tbody>
      </table>
    </div>
  );
};

export default Blog;
