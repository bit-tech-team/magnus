import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../../components/misc/Alert";
import axiosClient from "../../config/axiosClient";
import img from "../../assets/banners/magnus-notext.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const { msg } = alert;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/users/forgot-password/`, {
        email,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <div className="relative min-h-screen grid !bg-black">
          <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
            <div className="relative sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden">
              <img src={img} alt="Magnus Project Manager" className="w-10/12" />
              {/*          <div className="absolute bg-black  opacity-25 inset-0 z-0"></div>
              <div className="w-full  lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
                <div className=" font-bold leading-tight mb-6 mx-auto w-full content-center items-center "></div>
              </div> */}
            </div>

            <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
              <div className="max-w-xl w-full space-y-12">
                <div className="lg:text-left text-center">
                  <div className="flex items-center justify-center ">
                    <div className="bg-black flex flex-col w-full border border-gray-900 rounded-lg px-8 py-10">
                      {msg && <Alert alert={alert} />}
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-8"
                      >
                        <label className="font-bold text-lg text-white">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Introduce Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
                        />
                        <button
                          type="submit"
                          className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold hover:bg-slate-800"
                        >
                          Send Email
                        </button>
                      </form>
                      <nav className="lg:flex lg:justify-between mt-5">
                        <Link
                          className="block text-center my-5 text-slate-500 uppercase text-xs"
                          to="/auth/magnus/register"
                        >
                          You do not have an account? Sign up
                        </Link>
                        <Link
                          className="block text-center my-5 text-slate-500 uppercase text-xs"
                          to="/auth/magnus/"
                        >
                          Do you already have an account? Log in
                        </Link>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
