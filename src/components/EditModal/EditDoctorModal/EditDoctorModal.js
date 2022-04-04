import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { editDoctorSchema } from "../../../utils/formSchemas";

export const EditDoctorModal = ({ doctorPhone, doctorEmail }) => {
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
                  Editando a {doctorEmail}
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Doctor modificado!
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
                    email: doctorEmail,
                    phone: doctorPhone,
                  }}
                  onSubmit={async (values, { setFieldError }) => {
                    try {
                      const result = await Axios.put(
                        "https://consultorio-server-aylin.herokuapp.com/editDoctor",
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
                  validationSchema={editDoctorSchema}
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
                            Numero de telefono
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
                        Confirmar doctor
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
                  <h3>El doctor ha sido actualizado exitosamente</h3>

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
