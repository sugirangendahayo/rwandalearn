/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterComponent = ({ strings, className }) => {
  return (
    <div className={className}>
      <Typewriter
        options={{
          strings: strings,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TypewriterComponent;
