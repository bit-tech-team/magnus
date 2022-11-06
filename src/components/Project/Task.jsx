import { formatDate } from "../../helpers/formatDate";
import useProjects from "../../hooks/useProjects";
import useAdmin from "../../hooks/useAdmin";

const Task = ({ task }) => {
  const { name, description, dateDelivery, priority, state, _id } = task;
  const admin = useAdmin();

  const { handleModalEditTask, handleModalDeleteTask, completeTask } =
    useProjects();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{formatDate(dateDelivery)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {priority}</p>
        {state && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completada por: {task.completed.name}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            onClick={() => handleModalEditTask(task)}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            Editar
          </button>
        )}

        <button
          onClick={() => completeTask(_id)}
          className={`${
            state ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {state ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            onClick={() => handleModalDeleteTask(task)}
            className="bg-red-500 hover:bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
