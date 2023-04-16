import axios from "axios";

export const BASE_URL_FRONTEND = "http://localhost:3000";

const api = axios.create();
api.defaults.baseURL = "http://localhost:5000/api/v2";
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json";

api.interceptors.request.use(
  function (config) {
    const userData = localStorage.getItem("usuariosDataTOC")
      ? JSON.parse(localStorage.getItem("usuariosDataTOC"))
      : null;

    const token = userData && userData.token ? userData.token : "";
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    // Do something with response data

    informeAPIErrorEnBody(response);
    if (
      response.data &&
      response.data.msg &&
      response.data.token &&
      response.data.msg === "Nuevo token."
    ) {
      const usuariosDataTOC = {};
      usuariosDataTOC["token"] = response.data.token;
      usuariosDataTOC["apellido"] = response.data.apellido || "";
      usuariosDataTOC["username"] = response.data.username || "";
      localStorage.setItem("usuariosDataTOC", JSON.stringify(usuariosDataTOC));
      return api(response.config);
    }

    return response;
  },
  function (error) {
    // Do something with response error
    informeErroresApiConsola(error);
    return Promise.reject(error);
  }
);

const DESARROLLO =
  process &&
  process.env &&
  process.env.REACT_APP_AMBIENTE &&
  (process.env.REACT_APP_AMBIENTE === "desarrollo" ||
    process.env.REACT_APP_AMBIENTE === "testing");

var cssRule = "color: red; font-size: 12px; font-weight: bold;";

const informeErroresApiConsola = (error) => {
  // No interesa loguear error 401 de autorizacion, ocurre seguido
  const ERROR_401 =
    error &&
    error.response &&
    error.response.status &&
    error.response.status === 401;

  if (!ERROR_401 && DESARROLLO) {
    console.log("Informe de errores");
    console.log(
      `%cEn producción setear REACT_APP_AMBIENTE=produccion"`,
      cssRule
    );
    if (error && error.config && error.config.url) {
      console.log(`Error en petición ${error.config.url}`);
    }
    if (
      error &&
      error.response &&
      error.response.config &&
      error.response.config.data
    ) {
      if (
        process &&
        process.env &&
        process.env.NODE_ENV &&
        process.env.NODE_ENV === "development"
      ) {
        console.log("Data enviada: ", error.response.config.data);
      }
    }
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.errores
    ) {
      console.log(error.response.data.errores);
    }
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.trace
    ) {
      console.log(error.response.data.trace);
    }
  }
};

const informeAPIErrorEnBody = (response) => {
  if (
    DESARROLLO &&
    response &&
    response.data &&
    response.data.status === "fail" &&
    response.data.msg
  ) {
    console.log("Mensaje error de la API:", response.data.msg);
  }
};

export default api;
