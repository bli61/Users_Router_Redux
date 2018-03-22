import React from 'react';
import { Link } from 'react-router-dom';

const User = ({id, firstName, lastName, title, sex, age, deleteUser}) => {
  return (
    <tr>
      <td><Link className="btn btn-outline-secondary" to={`/edit/${id}`}>Edit</Link></td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{title}</td>
      <td>{sex}</td>
      <td>{age}</td>
      <td>
        <button 
          type="button" 
          className="btn btn-outline-danger"
          onClick={() => deleteUser(id)}
        >
            Delete
        </button>
        </td>
    </tr>
  );
};

export default User;