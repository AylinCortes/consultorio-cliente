import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

export const EditDateModal = ({ dateId, total }) => {
  const history = useHistory();
  const [editedDate, setEditedDate] = useState(false);

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
              {!editedDate ? (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  Editando la cita con el ID {dateId}
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Cita modificada!
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
              {!editedDate ? (
                <Formik
                  initialValues={{
                    dateId,
                    total,
                  }}
                  onSubmit={async (values, { setFieldError }) => {
                    try {
                      const result = await Axios.put(
                        "https://consultorio-server-aylin.herokuapp.com/editDate",
                        values
                      );
                      if (result.status === 202) {
                        setEditedDate(true);
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
                  // validationSchema={editDoctorSchema}
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
                          <label style={{ color: "black" }} htmlFor="total">
                            Monto total
                          </label>

                          <input
                            id="total"
                            type="text"
                            name="total"
                            placeholder="Cantidad total"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.total}
                          />
                          {touched.total && errors.total ? (
                            <div style={{ color: "red" }}>{errors.total}</div>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Confirmar cita
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
                  <h3>La cita ha sido actualizado exitosamente</h3>

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
