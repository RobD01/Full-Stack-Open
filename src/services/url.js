// Change whether we're in testing (true) or production (false) build.
const dev = true;

const base = dev
  ? "http://localhost:3001/api/"
  : "https://full-stack-open-backend.onrender.com/api/";

// Phonebook App
export const phonebookUrl = base + "persons";

// Blog App
export const blogUrl = base + "blog";
export const userUrl = base + "users";
export const loginUrl = base + "login";
