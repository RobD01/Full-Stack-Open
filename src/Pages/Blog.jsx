import React from "react";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar";
import InfoToggle from "../Components/InfoToggle";
import { useState, useEffect, useRef } from "react";
import {
  getAll,
  create,
  update,
  deleteItem,
  setToken,
} from "../services/blog.js";
import login from "../services/login";
import signup from "../services/signup";
import LoginForm from "../Components/LoginForm";
import BlogForm from "../Components/BlogForm";
import SignupForm from "../Components/SignupForm";
import Togglable from "../Components/Togglable ";

const Blog = () => {
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
  const [loginFormDisplay, setLoginFormDisplay] = useState("");

  // Sign Up Form
  const [name, setName] = useState("");
  const [signupFormDisplay, setSignupFormDisplay] = useState("");

  // Error Alert
  const [alert, setAlert] = useState("");

  // Forms handler #####

  // Signup

  // Post request on backend, and adding name into frontend table
  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes,
    };

    blogFormRef.current.toggleVisibility();

    if (!blogObject.title) {
      alert("Error: missing title");
    } else {
      create(blogObject).then((returnedItem) => {
        setBlogList(blogList.concat(returnedItem));
        handleClear();
      });
    }
  };

  // Add new post

  // Clear Form
  const handleClear = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };

  // Delete request on backend, and delete name from frontend table
  const handleDelete = (id) => {
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

  // Sign up user
  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const user = await signup({
        username,
        name,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error);
    }
    console.log("handleSignUp complete", name, username, password);
  };

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
    } catch (error) {
      setAlert("Incorrect Log in");
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

  const signupForm = () => {
    return (
      <SignupForm
        username={username}
        name={name}
        password={password}
        handleUsername={({ target }) => setUsername(target.value)}
        handleName={({ target }) => setName(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        handleSignUp={handleSignUp}
      />
    );
  };

  const blogFormRef = useRef();

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    );
  };

  const render = blogList.map((blog) => (
    <tr key={blog.title}>
      <td> {blog.title}</td>
      <td> {blog.userId.username}</td>
      <td> {blog.likes}</td>
      <td> {blog.url}</td>
      <td>
        <Button variant="warning">Like</Button>
      </td>
      <td>
        <Button variant="secondary" onClick={(e) => handleUpdate(blog.id, e)}>
          Update
        </Button>
      </td>
      <td>
        <Button
          variant="danger"
          onClick={(e) => handleDelete(blog.id, blog.name, e)}
          name="Delete"
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  // Display signup form or login form
  const handleSignupForm = () => {
    setSignupFormDisplay(!signupFormDisplay);
    setLoginFormDisplay(false);
  };

  const handleLoginForm = () => {
    setLoginFormDisplay(!loginFormDisplay);
    setSignupFormDisplay(false);
  };

  // Display on logged out or logged in

  const alertDisplay = !user
    ? "d-block bg-success bg-opacity-25 m-1 text-center"
    : "d-none";
  const listDisplay = user
    ? "d-block bg-success bg-opacity-25 m-1 text-center"
    : "d-none";
  const formDisplay = user
    ? "w-100 mx-auto bg-info bg-opacity-25 m-3 text-center"
    : "d-none";
  const loginDisplay = !user && loginFormDisplay ? "d-block" : "d-none";
  const signupDisplay = !user && signupFormDisplay ? "d-block" : "d-none";

  // Display intro
  const introDisplay = user ? "d-none" : "bg-dark color text-light m-5";

  const introButtonDisplay = user
    ? "d-none "
    : "d-flex justify-content-around w-50 mx-auto";

  return (
    <div className="container">
      <Navigation />
      {/* Intro */}
      <h2 className="text-center">Blog App</h2>
      {/* Toggle info section */}
      <InfoToggle
        function="User login with token authentication (using JWT).
        Persistant storage with backend services (deployed on Render).
        First log in, then you can post/edit/delete blog posts.

            "
        concept="CRUD axios request, JWT token authentication"
      />

      {/* Forms */}

      <div className={introButtonDisplay}>
        <Button onClick={handleLoginForm} name="intro log in">
          Log in
        </Button>
        <Button onClick={handleSignupForm}>Sign up</Button>
      </div>

      <div className={signupDisplay}>{signupForm()}</div>
      <div className={loginDisplay}>{loginForm()}</div>

      {/* Log in Alert */}
      <div className={alertDisplay}>
        <h3>{alert}</h3>
      </div>

      {/* Welcome User */}
      <div className={listDisplay}>
        <h4>Welcome {!user ? null : user.name}</h4>
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      {/* Form */}
      <div className={formDisplay}>
        <Togglable
          buttonLabel="Add Blog Post"
          ref={blogFormRef}
          id="AddBlogPost"
        >
          <BlogForm
            title={title}
            author={author}
            url={url}
            likes={likes}
            handleTitle={({ target }) => setTitle(target.value)}
            handleAuthor={({ target }) => setAuthor(target.value)}
            handleUrl={({ target }) => setUrl(target.value)}
            handleLikes={({ target }) => setLikes(target.value)}
            addBlog={addBlog}
            handleClear={handleClear}
          />
        </Togglable>
      </div>

      {/* Table results */}
      <div className={listDisplay}>
        <Togglable buttonLabel="View Blog List">
          <h3>Blog Posts</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Username</th>
                <th scope="col">Likes</th>
                <th scope="col">Post Body</th>
              </tr>
            </thead>
            <tbody>{render}</tbody>
          </table>
        </Togglable>
      </div>
      <div className={introDisplay}>
        <p>Sample accounts to log in: </p>
        <p>[username]: pikachu , [password]: password</p>
        <p>[username]: mewtwo, [password]: password</p>
        <p>
          {" "}
          If you register, please log out, then log back in. To get the token
          auth and use the blog form{" "}
        </p>
      </div>
    </div>
  );
};

export default Blog;
