import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import Alert from "../../components/misc/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const params = useParams();
  const { id } = params;
  const { msg } = alert;

  useEffect(() => {
    const confirmAccounts = async () => {
      try {
        const url = `/users/confirm/${id}`;

        const { data } = await axiosClient(url);

        setAlert({
          msg: data.msg,
          error: false,
        });
        setConfirmedAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    confirmAccounts();
  }, []);

  return (
    <>
      <h1 className="font-black text-6xl capitalize">
        <span className="text-orange-500">Confirma</span>{" "}
        <span className="text-red-500">tu</span>{" "}
        <span className="text-sky-500">cuenta</span>{" "}
        <span className="text-orange-500">y</span>{" "}
        <span className="text-red-500">comienza</span>{" "}
        <span className="text-sky-500">a</span>{" "}
        <span className="text-orange-500">crear</span>{" "}
        <span className="text-red-500">tus</span>{" "}
        <span className="text-sky-500">Proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {confirmedAccount && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
