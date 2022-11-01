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

  const patreon = "https://patreon.com/moneytheory";
  const PatreonIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Patreon_logo.svg/800px-Patreon_logo.svg.png";

  const coffee = "https://www.buymeacoffee.com/moneytheorF";
  const CoffeeIcon =
    "https://user-images.githubusercontent.com/16066404/77041853-a2044100-69e0-11ea-8da6-d64822a2c72a.jpg";

  return (
    <div className="container">
      <Navigation />
      <h2 className="text-center">Home</h2>

      {/* Intro */}
      <div className="my-4 bg-dark p-3 text-white text-center">
        <p>
          Here are practice projects for learning the MERN stack, full-stack Web
          Development
        </p>
        <p>
          My goal is to become a developer that can work on either front or
          back-end
        </p>
        <p>My other passions include finance and cinematography</p>
        <p>My Github, Youtube, Patreon, and Buy Me Coffee below:</p>
      </div>

      {/* Portfolio links */}
      <div className="my-2 mx-5 d-flex justify-content-center flex-wrap">
        <a href={github} target="_blank" rel="noreferrer" className="m-3">
          <img src={githubIcon} alt="Github" height="100" />
        </a>
        <a href={youtube} target="_blank" rel="noreferrer" className="m-3">
          <img src={youtubeIcon} alt="Youtube" height="100" />
        </a>

        <a href={patreon} target="_blank" rel="noreferrer" className="m-3">
          <img src={PatreonIcon} alt="Patreon" height="100" />
        </a>

        <a href={coffee} target="_blank" rel="noreferrer" className="m-3">
          <img src={CoffeeIcon} alt="Coffee" height="100" />
        </a>
      </div>
    </div>
  );
};

export default Home;
