import React, { useState, useEffect } from "react";
import Axios from "axios";

import { RegisterPaymentModal } from "../components/RegisterModal/RegisterPaymentModal/RegisterPaymentModal";
import { DeletePaymentModal } from "../components/DeleteModal/DeletePaymentModal/DeletePaymentModal";

// import { registerDoctorSchema } from "../utils/formSchemas";

export const Payments = () => {
  const [paymentsArray, setPaymentsArray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPayments = async () => {
      const result = await Axios.get("https://consultorio-server-aylin.herokuapp.com/getAllPayments");
      if (result.data.payments) {
        if (result.data.payments.length > 0) {
          setPaymentsArray(result.data.payments);
        }
      }
      setIsLoading(false);
    };

    getAllPayments();
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
                  <h6 className="m-0 font-weight-bold text-primary">Pagos</h6>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Registrar pagos
                  </button>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  {paymentsArray ? (
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
                              <th>Asignado a</th>
                              <th>Total</th>
                              <th>Total pagado</th>
                              <th>Deuda</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>Asignado a</th>
                              <th>Total</th>
                              <th>Total pagado</th>
                              <th>Deuda</th>
                              <th>Opciones</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {paymentsArray.length > 0 ? (
                              <>
                                {paymentsArray.map((payment) => (
                                  <tr key={payment.id}>
                                    {console.log(payment)}
                                    <td>{payment.assigned_to}</td>
                                    <td>{payment.total}</td>
                                    <td>{payment.current_credit}</td>
                                    <td>{payment.debt}</td>
                                    <td>
                                      <div className="btn-group">
                                        <button
                                          type="button"
                                          className="btn btn-outline-danger"
                                          data-bs-toggle="modal"
                                          data-bs-target="#deleteModal"
                                        >
                                          Eliminar
                                        </button>
                                      </div>
                                      <DeletePaymentModal id={payment.id} />
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
              <RegisterPaymentModal />
            </div>
          </div>
        </div>
      );
    }
  };

  return <PatientContent />;
};
