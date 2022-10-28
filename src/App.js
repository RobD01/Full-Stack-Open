import React from "react";

import { HashRouter, Routes, Route } from "react-router-dom";
import CourseList from "./Pages/CourseList";
import Phonebook from "./Pages/Phonebook";
import Home from "./Pages/Home";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="phonebook" element={<Phonebook />} />
          <Route path="courselist" element={<CourseList />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
