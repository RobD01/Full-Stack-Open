import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar";

const Resources = () => {
  return (
    <div className="container">
      <Navigation />
      <h2 className="text-center">Resources</h2>

      {/* Intro */}
      <div className="my-4 bg-dark p-3 text-white text-center">
        <p>Here are resources that helped me learn</p>

        {/* Test */}
        <p>Commands to test: </p>
        <p>npm run dev</p>

        {/* Publish */}
        <p> Commands to publish: </p>
        <p>git add .</p>
        <p>git commit -m </p>
        <p>git push</p>
        <p>npm run deploy</p>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Link</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {/* Concurrent */}
          <tr>
            <td>
              {" "}
              <a
                target="_blank"
                href="https://stackoverflow.com/questions/64537681/run-node-react-concurrently-in-separate-folders"
                rel="noreferrer"
              >
                Concurrent run dev
              </a>
            </td>
            <td> Concurrently run front and back end from different folder</td>
          </tr>

          {/* Access state from another component */}
          <tr>
            <td>
              <a
                target="_blank"
                href="https://www.geeksforgeeks.org/how-to-send-state-props-to-another-component-in-react-with-onclick/"
                rel="noreferrer"
              >
                Component State
              </a>
            </td>
            <td>State from another component</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
