import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axiosClient from "../../config/axiosClient";
import Alert from "../../components/misc/Alert";

const NewPassword = () => {
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const { token } = params;
  const { msg } = alert;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setAlert({
        msg: "El password tiene que tener mínimo 8 caracteres",
        error: true,
      });
    }

    try {
      const url = `/users/forgot-password/${token}`;

      const { data } = await axiosClient.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPasswordModified(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="font-black text-6xl capitalize">
        <span className="text-orange-500">Restablece</span>{" "}
        <span className="text-red-500">tu</span>{" "}
        <span className="text-sky-500">contraseña</span>{" "}
        <span className="text-orange-500">y</span>{" "}
        <span className="text-red-500">no</span>{" "}
        <span className="text-sky-500">pierdas</span>{" "}
        <span className="text-orange-500">acceso</span>{" "}
        <span className="text-red-500">tus</span>{" "}
        <span className="text-sky-500">Proyectos</span>
      </h1>
{/*       <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu contraseña y no peirdas acceso tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1> */}

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg p-10"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="new-password"
            >
              Nueva Contraseña
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="Introduzca su nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Cambiar Contraseña"
            className="bg-orange-500 w-full mb-5 py-3 text-white uppdercase font-bold rounded hover:cursor-pointer hover:bg-orange-600 transition-colors"
          />
        </form>
      )}

      {passwordModified && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
