import React, { useEffect, useState } from "react";

import Axios from "axios";

import { RegisterDoctorModal } from "../components/RegisterModal/RegisterDoctorModal/RegisterDoctorModal";
import { EditDoctorModal } from "../components/EditModal/EditDoctorModal/EditDoctorModal";
import { DeleteDoctorModal } from "../components/DeleteModal/DeleteDoctorModal/DeleteDoctorModal";

export const Doctors = () => {
  const [doctorsArray, setDoctorsArray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllDoctors = async () => {
      const result = await Axios.get("https://consultorio-server-aylin.herokuapp.com/getAllDoctors");
      if (result.data.length > 0) {
        setDoctorsArray(result.data);
      }
      setIsLoading(false);
    };

    getAllDoctors();
  }, []);

  const DoctorContent = () => {
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
                    Doctores
                  </h6>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Registrar doctor
                  </button>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  {doctorsArray ? (
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
                              <th>Especialidad</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>Nombre</th>
                              <th>Apellido</th>
                              <th>email</th>
                              <th>Telefono</th>
                              <th>Especialidad</th>
                              <th>Opciones</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {doctorsArray.length > 0 ? (
                              <>
                                {doctorsArray.map((doctor) => (
                                  <tr key={doctor.id}>
                                    <td>{doctor.firstname}</td>
                                    <td>{doctor.lastname}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.phone}</td>
                                    <td>{doctor.speciality}</td>
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
                                      <EditDoctorModal
                                        doctorEmail={doctor.email}
                                        doctorPhone={doctor.phone}
                                      />
                                      <DeleteDoctorModal
                                        doctorEmail={doctor.email}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <h1>No hay doctores registrados</h1>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <h1>No hay doctores registrados</h1>
                  )}
                </div>
              </div>
              <RegisterDoctorModal />
            </div>
          </div>
        </div>
      );
    }
  };

  return <DoctorContent />;
};
