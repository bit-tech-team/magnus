import { Link } from "react-router-dom";

import ModalSearcher from "../../components/Modals/ModalSearcher";
import useProjects from "../../hooks/useProjects";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { handleSearcher, closeSessionProjects } = useProjects();
  const { closeSessionAuth } = useAuth();

  const handleCloseSession = () => {
    closeSessionProjects();
    closeSessionAuth();
    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="xl:flex xl:justify-between sm:flex sm:justify-between md:flex md:justify-between">
        <h2 className="text-4xl font-black mb-5 md:mb-0 text-center">
          <span className="text-orange-500">Magnus</span>{" "}
          <span className="text-red-500">Project</span>{" "}
          <span className="text-sky-500">Manager</span>{" "}
        </h2>

        <div className="flex flex-col xl:flex-row sm:flex-row md:flex-row items-center gap-4">
          <button
            onClick={handleSearcher}
            type="button"
            className="font-bold uppercase"
          >
            Search Project
          </button>

          <Link to="/projects" className="font-bold uppercase">
            Projects
          </Link>

          <button
            onClick={handleCloseSession}
            type="button"
            className="text-white text-sm bg-sky-500 hover:bg-sky-600 p-3 rounded-md uppercase font-bold"
          >
            Log out
          </button>

          <ModalSearcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
