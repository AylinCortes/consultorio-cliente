import React from "react";

export const RegisterDateModal = ({ history }) => {
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
              <h5 className="modal-title text-gray-20" id="staticBackdropLabel">
                ¡Cita agendada!
              </h5>
              <button
                id="closeRegisterModal2"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <h3>La cita ha sido creado exitosamente</h3>

                <hr />

                <button
                  type="button"
                  className="btn btn-primary btn-user btn-block"
                  onClick={() => {
                    document.getElementById("closeRegisterModal2").click();
                    history.push("/dates");
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
