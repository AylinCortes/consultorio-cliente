import React, { useEffect, useState } from "react";

import Axios from "axios";

import data from "../pages/mock-data.json"
import { ReadOnlyRow } from "../components/ReadOnlyRow";
import { EditableRow } from "../components/EditableRow";

import { useHistory } from "react-router-dom";

export const Doctors = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [receptionists, setReceptionists] = useState(data);
  const [editReceptionistId, setEditReceptionistId] = useState(null);

  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const getAllReceptionists = async () => {
      const result = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getAllDoctors"
      );
      if (result.data.length > 0) {
        setReceptionists(result.data);
      }
      setIsLoading(false);
    };

    getAllReceptionists();
  }, []);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();

    const newContact = {
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      email: addFormData.email,
      phone: addFormData.phone,
      speciality: addFormData.speciality,
    };

    const newReceptionists = [...receptionists, newContact];
    try {
      const result = await Axios.post(
        "https://consultorio-server-aylin.herokuapp.com/registerDoctor",
        newContact
      );
      if (result.status === 202) {
        setReceptionists(newReceptionists);
        history.go(0);
      }
    } catch (e) {
      console.log(e)
      if (e.response.status === 409) {
        alert("El email ya esta en uso");
      } else if (e.response.status === 500) {
        alert(
          "Tenemos un error en el servidor. Intentelo mas tarde"
        );
      }
    }
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, receptionist) => {
    event.preventDefault();
    setEditReceptionistId(receptionist.id);

    const formValues = {
      id: receptionist.id,
      firstName: receptionist.firstName,
      lastName: receptionist.lastName,
      email: receptionist.email,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedContact = {
      id: editReceptionistId,
      name: editFormData.firstName,
      phone: editFormData.phone,
      email: editFormData.email,
    };

    const newReceptionists = [...receptionists];

    const index = receptionists.findIndex((receptionist) => receptionist.id === editReceptionistId);

    newReceptionists[index] = editedContact;

    try {
      console.log(newReceptionists)
      const result = await Axios.put(
        "https://consultorio-server-aylin.herokuapp.com/editDoctor",
        newReceptionists[index]
      );
      if (result.status === 202) {
        setReceptionists(newReceptionists);
        setEditReceptionistId(null);
        history.go(0);
      }
    } catch (e) {
      if (e.response.status === 409) {
        alert("El email ya esta en uso");
      } else if (e.response.status === 500) {
        alert(
          "Tenemos un error en el servidor. Intentelo mas tarde"
        );
      }
    }
  };

  const handleCancelClick = () => {
    setEditReceptionistId(null);
  };

  const handleDeleteClick = async (receptionistId) => {
    const newReceptionists = [...receptionists];

    const index = receptionists.findIndex((receptionist) => receptionist.id === receptionistId);

    try {
      console.log(newReceptionists, index)
      const result = await Axios.delete(
        "https://consultorio-server-aylin.herokuapp.com/deleteDoctor",
        {
          params: {
            email: newReceptionists[index].email,
          },
        }
      );
      if (result.status === 202) {
        newReceptionists.splice(index, 1);
        setReceptionists(newReceptionists);
      }
    } catch (e) {
      console.log(e)
      if (e.response.status === 500) {
        alert(
          "Tenemos un error en el servidor. Intentelo mas tarde"
        );
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : (
        <div className="app-container">
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>

                {receptionists.map((receptionist) => (
                  <>
                    {editReceptionistId === receptionist.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        user={receptionist}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </form>

          <h2>Añadir un doctor</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input
              type="text"
              name="firstName"
              required="required"
              placeholder="Ingresa un nombre..."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="lastName"
              required="required"
              placeholder="Ingresa un apellido..."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="email"
              required="required"
              placeholder="Ingresa un email..."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="phone"
              required="required"
              placeholder="Ingresa un numero..."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="speciality"
              required="required"
              placeholder="Ingresa una especialidad..."
              onChange={handleAddFormChange}
            />
            <button type="submit">Añadir</button>
          </form>
        </div>
      )}
    </>
  )
};
