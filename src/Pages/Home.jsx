import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar";

const Home = () => {
  // Portfolio links
  const githubIcon =
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
  const github = "http://github.com/RobD01";
  const youtubeIcon = "https://cdn-icons-png.flaticon.com/512/1384/1384060.png";
  const youtube = "https://www.youtube.com/channel/UCw-d1MWiu7c5F42afsodrKQ";

  return (
    <div className="container">
      <Navigation />
      <h2 className="text-center">Home</h2>

      {/* Intro */}
      <div className="my-4 bg-info p-3 text-white text-center">
        <p>
          Here are practice projects for learning the MERN stack, full-stack Web
          Development
        </p>
        <p>
          My goal is to become a developer that can work on either front or
          back-end
        </p>
        <p>My other passions include finance and cinematography</p>
        <p>My Github and Youtube portfolio below:</p>
      </div>

      {/* Portfolio links */}
      <div className="my-2 d-flex justify-content-center">
        <a href={github} target="_blank" rel="noreferrer">
          <img src={githubIcon} alt="Github" height="100" />
        </a>
        <a href={youtube} target="_blank" rel="noreferrer">
          <img src={youtubeIcon} alt="Youtube" height="100" />
        </a>
      </div>
    </div>
  );
};

export default Home;
