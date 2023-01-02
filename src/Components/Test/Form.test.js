// npm run test CI=true

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "../BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  // const { addBlog } = BlogForm;

  // const container = render(<BlogForm addBlog={addBlog} />).container;

  const Title = screen.getByPlaceholderText("Enter title");
  const Author = screen.getByPlaceholderText("Enter author");
  const Body = screen.getByPlaceholderText("Enter Post Body");
  const Likes = screen.getByPlaceholderText("Enter Likes");
  const sendButton = screen.getByText("Submit");

  await user.type(Title, "testing a form...");
  await user.type(Author, "testing a form...");
  await user.type(Body, "testing a form...");
  await user.type(Likes, "testing a form...");
  await user.click(sendButton);

  console.log(createNote);

  expect(createNote.mock.calls).toHaveLength(4);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
