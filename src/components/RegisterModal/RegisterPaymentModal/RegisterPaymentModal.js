import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

// import { registerPatientSchema } from "../../../utils/formSchemas";

export const RegisterPaymentModal = () => {
  const history = useHistory();
  const [registeredPayment, setRegisteredPayment] = useState(false);

  return (
    <div>
      <div
        className="modal"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {!registeredPayment ? (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  Registra un pago
                </h5>
              ) : (
                <h5
                  className="modal-title text-gray-20"
                  id="staticBackdropLabel"
                >
                  ¡Pago registrado!
                </h5>
              )}
              <button
                id="closeRegisterModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!registeredPayment ? (
                <Formik
                  initialValues={{
                    amount: "",
                    paymentID: "",
                    patientEmail: "",
                  }}
                  onSubmit={async (values, { setFieldError }) => {
                    try {
                      const result = await Axios.post(
                        "https://consultorio-server-aylin.herokuapp.com/registerPayment",
                        values
                      );
                      if (result.status === 202) {
                        setRegisteredPayment(true);
                      }
                    } catch (e) {
                      if (e.response.status === 409) {
                        setFieldError(
                          "patientEmail",
                          "El patientEmail ya esta en uso"
                        );
                      } else if (e.response.status === 500) {
                        alert(
                          "Tenemos un error en el servidor. Intentelo mas tarde"
                        );
                      }
                      console.log(e);
                    }
                  }}
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
                          <label style={{ color: "black" }} htmlFor="paymentID">
                            ID del ticket
                          </label>
                          <input
                            type="text"
                            id="paymentID"
                            name="paymentID"
                            placeholder="ID del ticket"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.paymentID}
                          />
                          {touched.paymentID && errors.paymentID ? (
                            <div style={{ color: "red" }}>
                              {errors.paymentID}
                            </div>
                          ) : null}
                        </div>
                        <div className="col">
                          <label
                            style={{ color: "black" }}
                            htmlFor="patientEmail"
                          >
                            Email del paciente
                          </label>
                          <input
                            type="text"
                            id="patientEmail"
                            name="patientEmail"
                            placeholder="Email del paciente"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.patientEmail}
                          />
                          {touched.patientEmail && errors.patientEmail ? (
                            <div style={{ color: "red" }}>
                              {errors.patientEmail}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="amount">
                            Cantidad a abonar
                          </label>

                          <input
                            id="amount"
                            type="amount"
                            name="amount"
                            placeholder="Cantidad a abonar"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.amount}
                          />
                          {touched.amount && errors.amount ? (
                            <div style={{ color: "red" }}>{errors.amount}</div>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Registrar pago
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-info btn-user btn-block"
                      >
                        Limpiar
                      </button>
                      <button
                        type="button"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        id="closeRegisterModal"
                        className="btn btn-outline-danger btn-user btn-block"
                      >
                        Cancelar
                      </button>
                    </form>
                  )}
                </Formik>
              ) : (
                <div>
                  <h3>El pago ha sido creado exitosamente</h3>

                  <hr />

                  <button
                    type="button"
                    className="btn btn-primary btn-user btn-block"
                    onClick={() => {
                      document.getElementById("closeRegisterModal").click();
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
