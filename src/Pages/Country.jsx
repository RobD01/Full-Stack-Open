import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar";
import axios from "axios";

const Country = () => {
  // States
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  // Backend
  const apiurl = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    console.log("effect");

    const eventHandler = (response) => {
      console.log("promise fulfilled");
      setData(response.data);
    };

    const promise = axios.get(apiurl);
    promise.then(eventHandler);
  }, []);

  // Frontend . Search bar, result table

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleClick = (event) => {
    setShow(!show);
  };

  const filter = data.filter((data) =>
    data.name.common.toLowerCase().includes(search)
  );

  // Country Specific Data
  const datashow = show ? "d-block" : "d-none";

  const buttonHide = filter.length === 1 ? "d-block" : "d-none";

  const dataHide = show && filter.length === 1 ? "d-block" : "d-none";

  const capital = filter.length === 1 ? filter[0].capital : "";

  const flag = filter.length === 1 ? filter[0].flags.png : "";

  // Render data
  const render = filter.map((data) => (
    <tr key={data.name.common}>
      <td> {data.name.common}</td>
      <td>
        <Button className={buttonHide} onClick={handleClick}>
          {show ? "Hide" : "View"}
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="container">
        <Navigation />
        <h2 className="text-center">Country App</h2>
        <div className="mt-5 bg-info p-3 text-white">
          <p>
            Function: uses a form find a country from the API database. If you
            narrow the search results to 1 country, a button appears to View
            Data. Clicking button outputs the country data.
          </p>
          <p>
            Concepts: useState, useEffect, server response, event handler, array
            filter, bootstrap, table
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

        <h2>Search Results</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>{render}</tbody>
        </table>

        <div className={dataHide}>
          <h2>Country Data</h2>
          <p>Capital: {capital}</p>
          <img src={flag} alt="Flag" />
        </div>
      </div>
    </>
  );
};

export default Country;
