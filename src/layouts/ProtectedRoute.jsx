import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Header from "../components/UI/Header";
import Sidebar from "../components/UI/Sidebar";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return "cargando...";

  return (
    <>
      {auth._id ? (
        <div>
          <Header />

          <div className="md:flex md:min-h-screen">
            <Sidebar />

            <main className="flex-1 p-10">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
