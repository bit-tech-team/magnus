import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";

import CollaboratorForm from "../components/Project/CollaboratorForm";
import Alert from "../components/misc/Alert";

const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator, alert } =
    useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (!project?._id) return <Alert alert={alert} />;

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador(a) al Proyecto: {project.name}
      </h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>

      {loading
        ? ""
        : collaborator?._id && (
            <div className="flex justify-center mt-10">
              <div className="bg-white py-10 px-10 md:w-1/2 rounded-lg shadow w-full">
                <h2 className="text-center mb-10 text-2xl font-bold">
                  Resultado
                </h2>
                <div className="flex justify-between item-center">
                  <p>{collaborator.name}</p>

                  <button
                    type="button"
                    onClick={() =>
                      addCollaborator({ email: collaborator.email })
                    }
                    className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  >
                    Agregar al Proyecto
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default NewCollaborator;
