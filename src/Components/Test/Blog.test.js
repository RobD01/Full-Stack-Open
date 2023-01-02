// npm run test CI=true

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test.only("clicking the button calls event handler once", async () => {
  const Blog = ({ blog, addBlog }) => {
    const label = "Add Blog";
    return (
      <li id="blog">
        {blog.title}
        <button onClick={addBlog}>{label}</button>
      </li>
    );
  };

  const blog = {
    title: "Component testing is done with react-testing-library",
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} addBlog={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("Add Blog");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
  };

  render(<Blog id="blog" blog={blog} />);

  // const div = container.querySelector("#blog");

  // expect(div).toHaveTextContent(
  //   "Component testing is done with react-testing-library"
  // );

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );

  screen.debug(element);
  // expect(element).toBeDefined();
});
