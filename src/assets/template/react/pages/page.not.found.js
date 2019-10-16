import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <div>Page not found</div>
        <center><Link to="/">Return to Home Page</Link></center>
    </div>
);
export default NotFound;