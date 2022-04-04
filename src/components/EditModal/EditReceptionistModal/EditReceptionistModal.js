import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { editReceptionistSchema } from "../../../utils/formSchemas";

export const EditReceptionistModal = ({
  receptionistEmail,
  receptionistName,
  receptionistLastname,
}) => {
  const history = useHistory();
  const [editedDoctor, setEditedDoctor] = useState(false);

  return (
    <div>
      <div
        className="modal"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {!editedDoctor ? (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  Editando a {receptionistEmail}
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Recepcionista modificado!
                </h5>
              )}
              <button
                id="closeEditModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!editedDoctor ? (
                <Formik
                  initialValues={{
                    email: receptionistEmail,
                    name: receptionistName,
                    lastname: receptionistLastname,
                  }}
                  onSubmit={async (values, { setFieldError }) => {
                    try {
                      const result = await Axios.put(
                        "https://consultorio-server-aylin.herokuapp.com/editReceptionist",
                        values
                      );
                      if (result.status === 202) {
                        setEditedDoctor(true);
                      }
                    } catch (e) {
                      if (e.response.status === 409) {
                        setFieldError("email", "El email ya esta en uso");
                      } else if (e.response.status === 500) {
                        alert(
                          "Tenemos un error en el servidor. Intentelo mas tarde"
                        );
                      }
                      console.log(e);
                    }
                  }}
                  validationSchema={editReceptionistSchema}
                >
                  {({
                    handleSubmit,
                    values,
                    handleChange,
                    errors,
                    touched,
                  }) => (
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="name">
                            Nombre:
                          </label>

                          <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.name}
                          />
                          {touched.name && errors.name ? (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="lastname">
                            Apellido:
                          </label>

                          <input
                            id="lastname"
                            type="text"
                            name="lastname"
                            placeholder="Apellido"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.lastname}
                          />
                          {touched.lastname && errors.lastname ? (
                            <div style={{ color: "red" }}>
                              {errors.lastname}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Confirmar recepcionista
                      </button>
                      <button
                        type="button"
                        aria-label="Close"
                        id="closeEditModal"
                        data-bs-dismiss="modal"
                        className="btn btn-outline-danger btn-user btn-block"
                      >
                        Cancelar
                      </button>
                    </form>
                  )}
                </Formik>
              ) : (
                <div>
                  <h3>El recepcionista ha sido actualizado exitosamente</h3>

                  <hr />

                  <button
                    type="button"
                    className="btn btn-primary btn-user btn-block"
                    onClick={() => {
                      document.getElementById("closeEditModal").click();
                      history.push("/");
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
