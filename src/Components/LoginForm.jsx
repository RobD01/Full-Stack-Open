import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import loginService from "../services/login";

const LoginForm = (props) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Log in user
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("Wrong credentials");
      setTimeout(() => {
        console.log(username, password, "login Complete");
      }, 1000);
    }
    console.log(user);
  };

  // Forms event handler
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

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
