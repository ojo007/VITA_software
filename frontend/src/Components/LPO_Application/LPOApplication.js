import React from 'react';
import { Link } from 'react-router-dom';
import './LPOApplication.css'; // Import the CSS file

const LPOApplication = () => {
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-12'>
          <h2 className="text-center mb-4">LPO Application</h2>
          <ul className="list-group">
            <li className="list-group-item mb-3">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h4>Create a new Application</h4>
                <Link to='/Homepage/AddLPO' className='btn btn-success'>Create</Link>
              </div>
            </li>
          
            <li className="list-group-item mb-3">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h4>Apply for a New Code</h4>
                <Link to='/' className='btn btn-success'>Apply</Link>
              </div>
            </li>

            <li className="list-group-item mb-3">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h4>View Items Master</h4>
                <Link to='/' className='btn btn-success'>View</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LPOApplication;
