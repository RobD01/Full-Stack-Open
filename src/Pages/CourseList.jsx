import React from "react";
import Navigation from "../Components/Navbar";

const Course = ({ name, parts }) => (
  <>
    <h1>{name}</h1>
    <ul>
      {parts.map((parts) => (
        <li key={parts.id}>
          {parts.name} : {parts.exercises}
        </li>
      ))}
    </ul>
    <h2>
      Total of{" "}
      {parts.reduce((a, b) => {
        return a.exercises + b.exercises;
      })}{" "}
      exercises
    </h2>
  </>
);

const CourseList = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const final = courses.map((courses) => {
    return (
      <>
        <Course name={courses.name} parts={courses.parts} key={courses.id} />
        <hr className="hr" />
      </>
    );
  });

  return (
    <>
      <div className="container">
        <Navigation />
        <h2 className="text-center">Course List</h2>
        <div className="my-5 bg-info p-3 text-white">
          <p>
            Function: Extract properties from JSON objects, outputs into a list
          </p>
          <p>
            Concepts: React component & props, JSON navigation, array map
            method, bootstrap
          </p>
        </div>
        {final}
      </div>
    </>
  );
};

export default CourseList;
