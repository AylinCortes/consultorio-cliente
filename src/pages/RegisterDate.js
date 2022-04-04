import React, { useState } from "react";

import Axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
// import { registerDoctorSchema } from "../../../utils/formSchemas";

import { RegisterDateModal } from "../components/RegisterModal/RegisterDateModal/RegisterDateModal";

export const RegisterDate = () => {
  const history = useHistory();
  const [availableDoctors, setAvailableDoctors] = useState(null);

  const searchAvailableDoctors = async (date, doctorSpeciality) => {
    try {
      const result = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getAllAvailableDoctors",
        {
          params: {
            date,
            doctorSpeciality,
          },
        }
      );
      if (result.status === 200) {
        setAvailableDoctors(result.data);
      }
    } catch (e) {
      if (e.response.status === 409) {
        // setFieldError("email", "El email ya esta en uso");
      } else if (e.response.status === 500) {
        alert("Tenemos un error en el servidor. Intentelo mas tarde");
      }
      console.log(e);
    }

    return true;
  };

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="card-body p-0">
          {/* <!-- Nested Row within Card Body --> */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-100 mb-4">Agenda una cita</h1>
                  <button
                    type="button"
                    id="displayModal"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                    style={{ display: "none" }}
                  ></button>
                </div>
                <Formik
                  initialValues={{
                    date: "",
                    doctorID: "",
                    patientEmail: "",
                    receptionistID: "",
                    totalPayment: 0,
                    currentPayment: 0,
                    doctorSpeciality: "",
                  }}
                  onSubmit={async (values) => {
                    try {
                      const result = await Axios.post(
                        "https://consultorio-server-aylin.herokuapp.com/registerDate",
                        values
                      );
                      if (result.status === 200) {
                        document.getElementById("displayModal").click();
                      }
                    } catch (e) {
                      if (e.response.status === 403) {
                        if (
                          e.response.data.message ===
                          "Patient has a date for the specified date"
                        ) {
                          alert(
                            "El paciente ya tiene una cita para este dia, por favor elija otro"
                          );
                        } else if (
                          e.response.data.message ===
                          "Patient has too many debts"
                        ) {
                          alert("El paciente tiene demasiadas deudas.");
                        } else if (
                          e.response.data.message ===
                          "The doctor is not available at that time"
                        ) {
                          alert("El paciente tiene demasiadas deudas.");
                        } else if (
                          e.response.data.message === "Patient does not exist"
                        ) {
                          alert(
                            "El paciente no existe. Favor de crearlo primero"
                          );
                        }
                      } else if (e.response.status === 500) {
                        alert(
                          "Tenemos un error en el servidor. Intentelo mas tarde"
                        );
                      }
                      console.log(e);
                    }
                  }}
                  // validationSchema={registerDoctorSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                  }) => (
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col">
                          <label style={{ color: "black" }} htmlFor="date">
                            Fecha de cita
                          </label>
                          <input
                            type="text"
                            id="date"
                            name="date"
                            placeholder="Fecha de la cita"
                            className="form-control form-control-user"
                            onChange={handleChange}
                            value={values.date}
                          />
                          {touched.date && errors.date ? (
                            <div style={{ color: "red" }}>{errors.date}</div>
                          ) : null}
                        </div>

                        <div className="col">
                          <label
                            style={{ color: "black" }}
                            htmlFor="doctorSpeciality"
                          >
                            Especialista
                          </label>
                          <select
                            name="doctorSpeciality"
                            id="doctorSpeciality"
                            onChange={handleChange}
                            value={values.doctorSpeciality}
                            aria-label="Default select example"
                            className="form-select form-control-user"
                          >
                            <option value="0">Seleccione uno</option>
                            <option value="peridoncia">Peridoncia</option>
                            <option value="endodoncia">Endodoncia</option>
                            <option value="odontologíaEstética">
                              Odontología estética
                            </option>
                            <option value="cariologia">Cariologia</option>
                            <option value="patologia">Patología</option>
                            <option value="maxilofacial">Maxilofacial</option>
                            <option value="rehabilitaciónOral">
                              Rehabilitación oral
                            </option>
                          </select>
                          {touched.doctorSpeciality &&
                          errors.doctorSpeciality ? (
                            <div style={{ color: "red" }}>
                              {errors.doctorSpeciality}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col"></div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-user btn-block"
                        onClick={() => {
                          searchAvailableDoctors(
                            values.date,
                            values.doctorSpeciality
                          );
                        }}
                      >
                        Buscar doctores disponibles
                      </button>
                      {availableDoctors && (
                        <>
                          {availableDoctors.length > 0 ? (
                            <>
                              <div className="form-group row">
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
                                  {touched.patientEmail &&
                                  errors.patientEmail ? (
                                    <div style={{ color: "red" }}>
                                      {errors.patientEmail}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <label
                                    style={{ color: "black" }}
                                    htmlFor="receptionistID"
                                  >
                                    ID Recepcionista
                                  </label>
                                  <input
                                    type="text"
                                    id="receptionistID"
                                    name="receptionistID"
                                    placeholder="ID Recepcionista"
                                    className="form-control form-control-user"
                                    onChange={handleChange}
                                    value={values.receptionistID}
                                  />
                                  {touched.receptionistID &&
                                  errors.receptionistID ? (
                                    <div style={{ color: "red" }}>
                                      {errors.receptionistID}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col">
                                  <label
                                    style={{ color: "black" }}
                                    htmlFor="doctorID"
                                  >
                                    Doctores disponibles
                                  </label>
                                  <select
                                    name="doctorID"
                                    id="doctorID"
                                    onChange={handleChange}
                                    value={values.doctorID}
                                    aria-label="Default select example"
                                    className="form-select form-control-user"
                                  >
                                    <option value="0" defaultValue={true}>
                                      Seleccione un doctor
                                    </option>
                                    {availableDoctors.map((doctor) => {
                                      return (
                                        <option
                                          key={doctor.id}
                                          value={doctor.id}
                                        >
                                          {doctor.firstname} {doctor.lastname}
                                        </option>
                                      );
                                    })}
                                    {touched.doctorID && errors.doctorID ? (
                                      <div style={{ color: "red" }}>
                                        {errors.doctorID}
                                      </div>
                                    ) : null}
                                  </select>
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="col">
                                  <label
                                    style={{ color: "black" }}
                                    htmlFor="totalPayment"
                                  >
                                    Monto total
                                  </label>
                                  <input
                                    type="text"
                                    id="totalPayment"
                                    name="totalPayment"
                                    placeholder="Monto total"
                                    className="form-control form-control-user"
                                    onChange={handleChange}
                                    value={values.totalPayment}
                                  />
                                  {touched.totalPayment &&
                                  errors.totalPayment ? (
                                    <div style={{ color: "red" }}>
                                      {errors.totalPayment}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <label
                                    style={{ color: "black" }}
                                    htmlFor="currentPayment"
                                  >
                                    ¿Cu&aacute;nto esta pagando el paciente?
                                  </label>
                                  <input
                                    type="text"
                                    id="currentPayment"
                                    name="currentPayment"
                                    placeholder="Pago del paciente"
                                    className="form-control form-control-user"
                                    onChange={handleChange}
                                    value={values.currentPayment}
                                  />
                                  {touched.currentPayment &&
                                  errors.currentPayment ? (
                                    <div style={{ color: "red" }}>
                                      {errors.currentPayment}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              {values.doctorID !== "0" &&
                                values.doctorID !== "" && (
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-user btn-block"
                                  >
                                    Agendar cita
                                  </button>
                                )}

                              <button
                                type="reset"
                                className="btn btn-info btn-user btn-block"
                              >
                                Limpiar
                              </button>
                              <button
                                type="button"
                                aria-label="Close"
                                data-bs-dismiss="modal"
                                id="closeRegisterModal"
                                className="btn btn-danger btn-user btn-block"
                                onClick={() => history.push("/dates")}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <h1>No hay doctores disponibles</h1>
                          )}
                        </>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterDateModal history={history} />
    </div>
  );
};
