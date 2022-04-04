import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Axios from "axios";

export const Dashboard = (props, { token }) => {
  console.log(props);
  const [isLoading, setIsLoading] = useState(true);
  const [totalMonthDates, setTotalMonthDates] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalDatesForToday, setTotalDatesForToday] = useState(0);
  const [totalRegisteredPatients, setTotalRegisteredPatients] = useState(0);
  const [allTodayDates, setAllTodayDates] = useState([]);
  const getDashboardValues = async () => {
    try {
      const totalMonthDates = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getTotalMonthDates"
      );
      const totalDoctors = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getTotalDoctors"
      );
      const totalDatesForToday = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getTotalDatesForToday"
      );
      const totalRegisteredPatients = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getTotalPatients"
      );
      const allTodayDates = await Axios.get(
        "https://consultorio-server-aylin.herokuapp.com/getAlltodayDates"
      );
      setTotalDoctors(totalDoctors.data.totalDoctors);
      setTotalMonthDates(totalMonthDates.data.totalDates);
      setTotalDatesForToday(totalDatesForToday.data.totalDates);
      setTotalRegisteredPatients(totalRegisteredPatients.data.totalUsers);
      setAllTodayDates(allTodayDates.data.result);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDashboardValues();
  }, []);

  return (
    <>
    <h1 style={{color: "black", fontSize:"10rem"}}>Hola!</h1>

      {isLoading ? null : (
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Panel de control</h1>
          </div>

          <div className="row">
            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Citas del mes
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {totalMonthDates}
                      </div>
                    </div>
                    <div className="col-auto">
                      {token && (
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          <Link to="/dates">
                            <button className="btn btn-primary">
                              Ver todos las citas
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Citas del día
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {totalDatesForToday}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Pacientes Registrados
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                            {totalRegisteredPatients}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      {token && (
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          <Link to="/patients">
                            <button className="btn btn-primary">
                              Ver todos los pacientes
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Doctores Registrados
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {totalDoctors}
                      </div>
                    </div>
                    <div className="col-auto">
                      {token && (
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          <Link to="/doctors">
                            <button className="btn btn-primary">
                              Ver todos los doctores
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1 row end */}
          <div className="row">
            {/* <!-- Area Chart --> */}
            <div className="col">
              <div className="card shadow mb-4">
                {/* <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Citas del día
                  </h6>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  {totalDatesForToday ? (
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
                            <th>Hora</th>
                            <th>Doctor</th>
                            <th>Total</th>
                            <th>Deuda Restante</th>
                            <th>Saldo</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Doctor</th>
                            <th>Total</th>
                            <th>Deuda Restante</th>
                            <th>Saldo</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {allTodayDates.map((date) => {
                            return (
                              <tr key={date.id}>
                                <td>{date.patientEmail}</td>
                                <td>{date.booked_date}</td>
                                <td>
                                  {date.Doctor.firstname} {date.Doctor.lastname}
                                </td>
                                <td>{date.Payment.total}</td>
                                <td>{date.Payment.debt}</td>
                                <td>{date.Payment.current_credit}</td>
                              </tr>
                            );
                          })}

                          <tr></tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <h3>No hay citas para hoy</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
