import React, { useEffect, useState } from "react";

import Axios from "axios";

import { RegisterReceptionistModal } from "../components/RegisterModal/RegisterReceptionistModal/RegisterReceptionistModal";
import { EditReceptionistModal } from "../components/EditModal/EditReceptionistModal/EditReceptionistModal";
import { DeleteReceptionistModal } from "../components/DeleteModal/DeleteReceptionistModal/DeleteReceptionistModal";

export const Receptionists = () => {
  const [receptionistsArray, setReceptionistsArray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllReceptionists = async () => {
      const result = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getAllReceptionists"
      );
      if (result.data.length > 0) {
        setReceptionistsArray(result.data);
      }
      setIsLoading(false);
    };

    getAllReceptionists();
  }, []);

  const ReceptionistContent = () => {
    if (isLoading) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col">
              <div className="card shadow mb-4">
                {/* <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Recepcionistas
                  </h6>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Registrar recepcionista
                  </button>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  {receptionistsArray ? (
                    <>
                      <div className="table-responsive">
                        <table
                          className="table table-bordered"
                          id="dataTable"
                          width="100%"
                          cellSpacing="0"
                        >
                          <thead>
                            <tr>
                              <th>Nombre</th>
                              <th>Apellido</th>
                              <th>Email</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>Nombre</th>
                              <th>Apellido</th>
                              <th>Email</th>
                              <th>Opciones</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {receptionistsArray.length > 0 ? (
                              <>
                                {receptionistsArray.map((receptionist) => (
                                  <tr key={receptionist.id}>
                                    <td>{receptionist.firstname}</td>
                                    <td>{receptionist.lastname}</td>
                                    <td>{receptionist.email}</td>
                                    <td>
                                      <div className="btn-group">
                                        <button
                                          type="button"
                                          className="btn btn-outline-secondary"
                                          data-bs-toggle="modal"
                                          data-bs-target="#editModal"
                                        >
                                          Editar
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-outline-danger"
                                          data-bs-toggle="modal"
                                          data-bs-target="#deleteModal"
                                        >
                                          Eliminar
                                        </button>
                                      </div>
                                      <EditReceptionistModal
                                        receptionistEmail={receptionist.email}
                                        receptionistName={
                                          receptionist.firstname
                                        }
                                        receptionistLastname={
                                          receptionist.lastname
                                        }
                                      />
                                      <DeleteReceptionistModal
                                        receptionistEmail={receptionist.email}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <h1>No hay recepcionistas registrados</h1>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <h1>No hay recepcionistas registrados</h1>
                  )}
                </div>
              </div>
              <RegisterReceptionistModal />
            </div>
          </div>
        </div>
      );
    }
  };

  return <ReceptionistContent />;
};
