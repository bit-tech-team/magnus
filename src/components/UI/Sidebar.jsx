import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xxl:w-1/6 xl:w-1/6 px-5 py-10 ">
      <p className="text-xl font-bold xs:text-center text-center">Welcome back {auth.name}</p>

      <Link
        to="create-project"
        className="bg-orange-500 hover:bg-orange-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Create Project
      </Link>
    </aside>
  );
};

export default Sidebar;
