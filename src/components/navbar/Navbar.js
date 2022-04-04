import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ token }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Consultorio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!token && (
              <li className="nav-item">
                <Link className="nav-link active" to="/signin">
                  Login
                </Link>
              </li>
            )}
            {token && (
              <>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Panel de control
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/dates">
                    Citas
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/patients">
                    Pacientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">
                    Doctores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/receptionist">
                    Recepcionistas
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/payments">
                    Pagos
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
