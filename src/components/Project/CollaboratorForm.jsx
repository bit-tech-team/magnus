import { useState } from "react";

import useProjects from "../../hooks/useProjects";
import Alert from "../misc/Alert";

const CollaboratorForm = () => {
  const [email, setEmail] = useState("");

  const { showAlert, alert, submitCollaborator } = useProjects();
  const { msg } = alert;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      showAlert({
        msg: "El Correo es Obligatorio",
        error: true,
      });
      return;
    }

    submitCollaborator(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alert alert={alert} />}

      <div className="mb-5">
        <label
          htmlFor="email-colaborador"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email Colaborador
        </label>
        <input
          id="email-colaborador"
          placeholder="Email del Colaborador"
          type="email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 w-full p-3 text-sm text-white uppercase font-bold cursor-pointer transition-colors rounded"
        value="Buscar colaborador"
      />
    </form>
  );
};

export default CollaboratorForm;
