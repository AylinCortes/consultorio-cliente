import React, { useEffect, useState } from "react";

import Axios from "axios";

import { RegisterPatientModal } from "../components/RegisterModal/RegisterPatientModal/RegisterPatientModal";
import { EditPatientModal } from "../components/EditModal/EditPatientModal/EditPatientModal";
import { DeletePatientModal } from "../components/DeleteModal/DeletePatientModal/DeletePatientModal";

export const Patients = () => {
  const [patientsArray, setDoctorsArray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPatients = async () => {
      const result = await Axios.get("https://consultorio-server-aylin.herokuapp.com/getAllPatients");
      if (result.data.length > 0) {
        setDoctorsArray(result.data);
      }
      setIsLoading(false);
    };

    getAllPatients();
  }, []);

  const PatientContent = () => {
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
                    Pacientes
                  </h6>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Registrar paciente
                  </button>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  {patientsArray ? (
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
                              <th>email</th>
                              <th>Telefono</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>Nombre</th>
                              <th>Apellido</th>
                              <th>email</th>
                              <th>Telefono</th>
                              <th>Opciones</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {patientsArray.length > 0 ? (
                              <>
                                {patientsArray.map((patient) => (
                                  <tr key={patient.email}>
                                    <td>{patient.firstname}</td>
                                    <td>{patient.lastname}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.phone}</td>
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
                                      <EditPatientModal
                                        patientEmail={patient.email}
                                        patientPhone={patient.phone}
                                      />
                                      <DeletePatientModal
                                        patientEmail={patient.email}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <h1>No hay pacientes registrados</h1>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <h1>No hay pacientes registrados</h1>
                  )}
                </div>
              </div>
              <RegisterPatientModal />
            </div>
          </div>
        </div>
      );
    }
  };

  return <PatientContent />;
};
