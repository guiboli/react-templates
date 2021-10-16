import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => {
  return (
    <div>
      <p>This is Home Page</p>
      <Link to="/hello-world">to Hello World Page</Link>
    </div>
  );
};

export { Home };
