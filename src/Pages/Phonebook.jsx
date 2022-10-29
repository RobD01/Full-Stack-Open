import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar";
import axios from "axios";

const Phonebook = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  // Backend

  const apiurl = "http://localhost:3001/persons";

  useEffect(() => {
    console.log("effect");

    const eventHandler = (response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    };

    const promise = axios.get(apiurl);
    promise.then(eventHandler);
  }, []);

  // Frontend
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filter = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    let duplicate = persons.some((person) => person["name"] === newName);
    if (duplicate) {
      alert(`${newName} is already in list`);
    } else {
      const persons2 = persons.concat({ name: newName, phone: newPhone });
      setPersons(persons2);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setPersons([]);
    setSearch("");
  };

  const render = filter.map((person) => (
    <tr key={person.name}>
      <td> {person.name}</td>
      <td> {person.phone}</td>
    </tr>
  ));

  return (
    <div className="container">
      <Navigation />
      <h2 className="text-center">Phonebook App</h2>
      <div className="mt-5 bg-info p-3 text-white">
        <p>Function: uses a form to save names and phone numbers to a list</p>
        <p>
          Concepts: useState, useEffect, server response, event handler, array
          filter, bootstrap, table,{" "}
        </p>
      </div>

      <Form className="my-5">
        <h5>Search by Name</h5>

        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={search}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      <Form className="my-5">
        <h5>Add New Entry</h5>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={newName}
            onChange={handleName}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={newPhone}
            onChange={handlePhone}
          />
        </Form.Group>

        <div>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="danger"
            className="mx-5"
            type="submit"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Form>
      <h2>Phone Book</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>{render}</tbody>
      </table>
    </div>
  );
};

export default Phonebook;
