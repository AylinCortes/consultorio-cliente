import React, { useEffect, useState } from "react";

import Axios from "axios";
import { Link } from "react-router-dom";

import { EditDateModal } from "../components/EditModal/EditDateModal/EditDateModal";
import { DeleteDateModal } from "../components/DeleteModal/DeleteDateModal/DeleteDateModal";

export const Dates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [datesArray, setDatesArray] = useState(null);

  useEffect(() => {
    const getAllDates = async () => {
      const result = await Axios.get("https://consultorio-server-aylin.herokuapp.com/getAllDates");
      if (result.data.result) {
        if (result.data.result.length > 0) {
          setDatesArray(result.data.result);
        }
      }
      setIsLoading(false);
    };

    getAllDates();
  }, []);

  const DateContent = () => {
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
                  <h6 className="m-0 font-weight-bold text-primary">Citas</h6>
                  <Link to="/registerDate">
                    <button type="button" className="btn btn-primary">
                      Agendar cita
                    </button>
                  </Link>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  {datesArray ? (
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
                              <th>Paciente</th>
                              <th>Fecha</th>
                              <th>Doctor</th>
                              <th>Precio Total</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>Paciente</th>
                              <th>Fecha</th>
                              <th>Doctor</th>
                              <th>Precio Total</th>
                              <th>Opciones</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {datesArray.length > 0 ? (
                              <>
                                {datesArray.map((date) => (
                                  <tr key={date.id}>
                                    <td>{date.patientEmail}</td>
                                    <td>{date.booked_date}</td>
                                    <td>
                                      {date.Doctor.firstname}{" "}
                                      {date.Doctor.lastname}
                                    </td>
                                    <td>{date.Payment.total}</td>
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
                                      <EditDateModal
                                        dateId={date.Doctor.id}
                                        dateTotal={date.total}
                                      />
                                      <DeleteDateModal id={date.id} />
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <h1>No hay citas agendadas</h1>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <h1>No hay citas agendadas</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <DateContent />;
};
