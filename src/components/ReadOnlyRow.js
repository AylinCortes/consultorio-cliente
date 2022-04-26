import React from "react";

export const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      {user.id ? (<td>{user.id}</td>) : null}
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      {user.speciality ? (<td>{user.speciality}</td>) : null}
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, user)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};