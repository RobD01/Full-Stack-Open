import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password,
}) => {
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

export default LoginForm;
