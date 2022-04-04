import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { editPatientSchema } from "../../../utils/formSchemas";

export const EditPatientModal = ({ patientPhone, patientEmail }) => {
  const history = useHistory();
  const [editedPatient, setEditedPatient] = useState(false);

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
              {!editedPatient ? (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  Editando a {patientEmail}
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Paciente modificado!
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
              {!editedPatient ? (
                <Formik
                  initialValues={{
                    email: patientEmail,
                    phone: patientPhone,
                  }}
                  onSubmit={async (values) => {
                    try {
                      const result = await Axios.put(
                        "https://consultorio-server-aylin.herokuapp.com/editPatient",
                        values
                      );
                      if (result.status === 202) {
                        setEditedPatient(true);
                      }
                    } catch (e) {
                      if (e.response.status === 500) {
                        alert(
                          "Tenemos un error en el servidor. Intentelo mas tarde"
                        );
                      }
                      console.log(e);
                    }
                  }}
                  validationSchema={editPatientSchema}
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
                          <label style={{ color: "black" }} htmlFor="phone">
                            Numero de telefonos
                          </label>

                          <input
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Numero de telefono"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.phone}
                          />
                          {touched.phone && errors.phone ? (
                            <div style={{ color: "red" }}>{errors.phone}</div>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Confirmar paciente
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
                  <h3>El paciente ha sido actualizado exitosamente</h3>

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
