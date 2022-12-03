import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignupForm = ({
  username,
  name,
  password,
  handleUsername,
  handleName,
  handlePassword,
  handleSignUp,
}) => {
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

export default SignupForm;
