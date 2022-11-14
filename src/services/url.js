// Change whether we're in testing (true) or production (false) build.
const dev = false;

const base = dev
  ? "http://localhost:3001/api/"
  : "https://full-stack-open-backend.onrender.com/api/";

export const phonebookUrl = base + "persons";
