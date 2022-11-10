import React from "react";

import { HashRouter, Routes, Route } from "react-router-dom";
import CourseList from "./Pages/CourseList";
import Phonebook from "./Pages/Phonebook";
import Home from "./Pages/Home";
import Country from "./Pages/Country";
import Resources from "./Pages/Resources";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="phonebook" element={<Phonebook />} />
          <Route path="courselist" element={<CourseList />} />
          <Route path="country" element={<Country />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
