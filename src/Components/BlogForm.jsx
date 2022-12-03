import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BlogForm = ({
  title,
  author,
  url,
  likes,
  handleTitle,
  handleAuthor,
  handleUrl,
  handleLikes,
  addBlog,
  handleClear,
}) => {
  return (
    <Form className="m-2">
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
