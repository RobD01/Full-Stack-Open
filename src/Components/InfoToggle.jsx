import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

const InfoToggle = (props) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  const buttonLabel = open ? "Hide App Info" : "View App Info";

  return (
    <>
      {/* Toggle Button */}
      <div className="text-center m-4">
        <Button
          onClick={handleToggle}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="warning"
        >
          {buttonLabel}
        </Button>
      </div>

      {/* Info Box */}
      <Collapse in={open}>
        <div className="my-4 bg-dark p-3 text-white">
          <p>
            <span className="text-info">Function: </span>
            {props.function}
          </p>

          <p>
            <span className="text-info"> Concepts: </span>
            {props.concept}
          </p>
          {props.extra}
        </div>
      </Collapse>
    </>
  );
};

export default InfoToggle;
