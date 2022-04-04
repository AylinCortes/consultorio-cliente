import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

export const DeleteDateModal = ({ id }) => {
  const history = useHistory();
  const [deletedDoctor, setDeletedDoctor] = useState(false);

  return (
    <div>
      <div
        className="modal"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {!deletedDoctor ? (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  Eliminando a {id}
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Doctor eliminado!
                </h5>
              )}
              <button
                id="closeDeleteModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!deletedDoctor ? (
                <Formik
                  initialValues={{
                    id,
                  }}
                  onSubmit={async (values) => {
                    try {
                      const result = await Axios.delete(
                        "https://consultorio-server-aylin.herokuapp.com/deleteDate",
                        {
                          params: {
                            id: values.id,
                          },
                        }
                      );
                      if (result.status === 202) {
                        setDeletedDoctor(true);
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
                >
                  {({ handleSubmit }) => (
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="phone">
                            ¿Seguro que desea eliminar la cita con el ID{" "}
                            {`${id}`}?
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Eliminar cita
                      </button>
                      <button
                        type="button"
                        aria-label="Close"
                        id="closeDeleteModal"
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
                  <h3>La cita ha sido eliminada exitosamente</h3>

                  <hr />

                  <button
                    type="button"
                    className="btn btn-primary btn-user btn-block"
                    onClick={() => {
                      document.getElementById("closeDeleteModal").click();
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
