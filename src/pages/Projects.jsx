import { useEffect } from "react";
import useProjects from "../hooks/useProjects";
import PreviewProjects from "../components/Project/PreviewProjects";

import Alert from "../components/misc/Alert";

import io from "socket.io-client";

let socket;

const Projects = () => {
  const { projects, alert } = useProjects();

  const { msg } = alert;

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black text-center">Projects</h1>

      {msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProjects key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            You have not projects yet
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
