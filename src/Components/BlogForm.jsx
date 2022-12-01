import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { getAll, create, update, deleteItem } from "../services/blog.js";

const BlogForm = (props) => {
  const [blogList, setBlogList] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  useEffect(() => {
    getAll().then((initialPersons) => {
      setBlogList(initialPersons);
    });
  }, []);

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
    event.preventDefault();
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

export default BlogForm;
