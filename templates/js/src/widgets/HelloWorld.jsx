import { Link } from 'react-router-dom';
import React from 'react';

const HelloWorld = () => {
  return (
    <div>
      <p>This is Hello World Page</p>
      <Link to="/">to Home Page</Link>
    </div>
  );
};

export { HelloWorld };
