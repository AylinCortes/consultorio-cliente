import React from "react";

export const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Ingrese un id"
          name="id"
          value={editFormData.id}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Ingrese un nombre..."
          name="firstName"
          value={editFormData.firstname}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Ingrese un apellido..."
          name="lastName"
          value={editFormData.lastname}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Ingrese un email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};