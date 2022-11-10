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
              >
                Concurrent run dev
              </a>
            </td>
            <td> Concurrently run front and back end from different folder</td>
          </tr>
          {/* Firebase Deploy */}
          <tr>
            <td>
              <a
                target="_blank"
                href="https://firebase.google.com/docs/cli#sign-in-test-cli"
              >
                Firebase deploy
              </a>
            </td>
            <td>Deploy the backend to Firebase</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
