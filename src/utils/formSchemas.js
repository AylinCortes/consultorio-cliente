import * as Yup from "yup";

// const passwordStrengthRegex = new RegExp(
//   `^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`
// );

export const signinSchema = Yup.object({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido"),
});

export const registerReceptionistSchema = Yup.object({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido"),
  firstName: Yup.string().required("Este campo es requerido"),
  lastName: Yup.string().required("Este campo es requerido"),
});

export const registerPatientSchema = Yup.object({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
  phone: Yup.string().required("Este campo es requerido").max(10),
  firstName: Yup.string().required("Este campo es requerido"),
  lastName: Yup.string().required("Este campo es requerido"),
});

export const registerDoctorSchema = Yup.object({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
  phone: Yup.string().required("Este campo es requerido").max(10),
  firstName: Yup.string().required("Este campo es requerido"),
  lastName: Yup.string().required("Este campo es requerido"),
  speciality: Yup.string().required("Este campo es requerido"),
});

export const editDoctorSchema = Yup.object({
  phone: Yup.string().required("Este campo es requerido").max(10),
});

export const editPatientSchema = Yup.object({
  phone: Yup.string().required("Este campo es requerido").max(10),
});

export const editReceptionistSchema = Yup.object({
  name: Yup.string().required("Este campo es requerido").max(10),
  lastname: Yup.string().required("Este campo es requerido"),
});
