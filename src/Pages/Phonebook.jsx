import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar";
import { getAll, create, update, deleteItem } from "../services/phonebook.js";
import InfoToggle from "../Components/InfoToggle";
import { phonebookUrl } from "../services/url";

const Phonebook = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  // Backend

  const apiurl = phonebookUrl;

  useEffect(() => {
    getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Post request on backend, and adding name into frontend table
  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newPhone,
    };

    if (!personObject.name || !personObject.number) {
      alert("Error: missing name or number");
    } else {
      create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  // Delete request on backend, and delete name from frontend table
  const handleDelete = (id, name) => {
    deleteItem(id);
    setPersons(
      persons.filter((person) => {
        return person.id !== id;
      })
    );
  };

  // Put request on backend, and update name from frontend table
  const handleUpdate = (id) => {
    const personObject = {
      name: newName,
      number: newPhone,
    };

    if (!personObject.name || !personObject.number) {
      alert("Error: missing name or number");
    } else {
      update(id, personObject);

      const newState = persons.map((person) => {
        // 👇️ if id equals 2 replace object
        if (person.id === id) {
          return personObject;
        }

        // 👇️ otherwise return object as is
        return person;
      });

      setPersons(newState);
    }
  };

  // Frontend

  // Forms event handler
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  // This is connected to the search bar
  const filter = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  const handleReset = (event) => {
    event.preventDefault();
    setPersons([]);
    setSearch("");
  };

  const render = filter.map((person) => (
    <tr key={person.name}>
      <td> {person.name}</td>
      <td> {person.number}</td>
      <td>
        <Button variant="secondary" onClick={(e) => handleUpdate(person.id, e)}>
          Update
        </Button>
      </td>
      <td>
        <Button
          variant="danger"
          onClick={(e) => handleDelete(person.id, person.name, e)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <Navigation />

      {/* Intro */}
      <h2 className="text-center">Phonebook App</h2>

      {/* Toggle info section */}
      <InfoToggle
        function="uses a form to save names and phone numbers 
        to a list. Persistant storage with backend services 
        (deployed on Render). Front-end connected directed to 
        the API hosted on Render. To add new name/number , 
        fill out the form and click [submit]. To update 
        name/number , fill out the form and click [update]
        that is next to person on the list            
            "
        concept="useState, useEffect, CRUD axios
            request, event handler, array filter, bootstrap, table, express NodeJS"
        // extra={
        //   <div>
        //     <Button
        //       href="https://github.com/RobD01/Full-Stack-Open"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //       className="mx-auto"
        //     >
        //       Full Stack Open Repo
        //     </Button>
        //   </div>
        // }
      />

      {/* Search bar */}
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

      {/* Add new person */}
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
          <Button variant="primary" type="submit" onClick={addPerson}>
            Submit
          </Button>
          <Button
            variant="warning"
            className="mx-5"
            type="submit"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Form>

      {/* Table results */}
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
