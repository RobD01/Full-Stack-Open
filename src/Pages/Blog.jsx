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
import signup from "../services/signup";

const Blog = () => {
  // States ####

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

  // Forms handler #####

  // Signup
  const handleName = (event) => {
    setName(event.target.value);
  };

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
    } catch (exception) {
      alert("Wrong credentials");
      setTimeout(() => {}, 1000);
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

  const signUpForm = () => {
    return (
      <Form className="my-5" onSubmit={handleSignUp}>
        <h5>Sign Up</h5>
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleName}
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
          <Button variant="primary" type="submit" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </Form>
    );
  };

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

  const render = blogList.map((blog) => (
    <tr key={blog.title}>
      <td> {blog.title}</td>
      <td> {blog.author}</td>
      <td>
        <Button variant="secondary" onClick={(e) => handleUpdate(blog.id, e)}>
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

  // Display signup form or login form
  const handleSignupForm = () => {
    setSignupFormDisplay(!signupFormDisplay);
    setLoginFormDisplay(false);
  };

  const handleLoginForm = () => {
    setLoginFormDisplay(!loginFormDisplay);
    setSignupFormDisplay(false);
  };

  // Display on logged or logged in
  const listDisplay = user ? "d-block" : "d-none";
  const formDisplay = user ? "d-block" : "d-none";
  const loginDisplay = !user && loginFormDisplay ? "d-block" : "d-none";
  const signupDisplay = !user && signupFormDisplay ? "d-block" : "d-none";

  // Display intro
  const introDisplay =
    "bg-dark color text-light m-5" + user ? "d-none" : "d-block";

  const introButtonDisplay = "d-flex justify-content-around w-50 mx-auto";

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
        <Button onClick={handleLoginForm}>Log in</Button>
        <Button onClick={handleSignupForm}>Sign up</Button>
      </div>

      <div className={signupDisplay}>{signUpForm()}</div>
      <div className={loginDisplay}>{loginForm()}</div>
      <div className={formDisplay}>
        <h2>Welcome {!user ? null : user.name}</h2>
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
        {blogForm()}
      </div>

      {/* Table results */}
      <div className={listDisplay}>
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
