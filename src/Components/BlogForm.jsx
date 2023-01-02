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
  handleClear,
  addBlog,
}) => {
  // const addBlog = (event) => {
  //   event.preventDefault();

  //   const blogObject = {
  //     title,
  //     author,
  //     url,
  //     likes,
  //   };

  //   blogFormRef.current.toggleVisibility();

  //   if (!blogObject.title) {
  //     alert("Error: missing title");
  //   } else {
  //     create(blogObject).then((returnedItem) => {
  //       setBlogList(blogList.concat(returnedItem));
  //       handleClear();
  //     });
  //   }
  // };

  return (
    <Form className="m-2 formDiv">
      <h5>Add New Post</h5>

      <Form.Group className="mb-3" id="Title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitle}
          name="Title"
        />
      </Form.Group>

      <Form.Group className="mb-3" id="Author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author"
          value={author}
          onChange={handleAuthor}
          name="Author"
        />
      </Form.Group>

      <Form.Group className="mb-3" id="Body">
        <Form.Label>Body</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Post Body"
          value={url}
          onChange={handleUrl}
          name="Body"
        />
      </Form.Group>

      <Form.Group className="mb-3" id="Likes">
        <Form.Label>Likes</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Likes"
          value={likes}
          onChange={handleLikes}
          name="Likes"
        />
      </Form.Group>

      <div>
        <Button variant="primary" type="submit" onClick={addBlog} id="Submit">
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
