import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../../hooks/useProjects";
import Alert from "../misc/Alert";

const ProjectForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateDelivery, setDateDelivery] = useState("");
  const [client, setClient] = useState("");

  const params = useParams();

  const { showAlert, alert, submitProject, project } = useProjects();
  const { msg } = alert;

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDateDelivery(project.dateDelivery?.split("T")[0]);
      setClient(project.client);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO validar fecha entrega no menor que fecha actual

    if ([name, description, dateDelivery, client].includes("")) {
      showAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //send data to the provider
    await submitProject({
      id,
      name,
      description,
      dateDelivery,
      client,
    });

    //TODO mejor la manera en la que se limpia el formulario
    setId(null);
    setName("");
    setDescription("");
    setDateDelivery("");
    setClient("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alert alert={alert} />}

      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre del Proyecto
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripción
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="date-delivery"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha Entrega
        </label>
        <input
          id="date-delivery"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={dateDelivery}
          onChange={(e) => setDateDelivery(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="client"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre del Cliente
        </label>
        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
        className="bg-orange-500 hover:bg-orange-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
