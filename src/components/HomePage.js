import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div>
      <h1>DotADorK</h1>

      <ol>
        <li>GoTo: <Link to="first-page">First Page</Link></li>
      </ol>
    </div>
  );
};

export default HomePage;
