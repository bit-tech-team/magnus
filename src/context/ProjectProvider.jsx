import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setPojects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  const [collaborator, setCollaborator] = useState({});

  const [modalFormTask, setModalFormTask] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
  const [searcher, setSearcher] = useState(false);

  const [task, setTask] = useState({});

  const { auth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient("/projects", config);
        setPojects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [auth]);

  /**
   *
   */
  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  /**
   *
   */
  const handleSearcher = () => {
    setSearcher(!searcher);
  };

  /**
   *
   * @param {*} collaborator
   */
  const handleModalDeleteCollaborator = (collaborator) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(collaborator);
  };

  /**
   *
   * @param {*} alert
   */
  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  /**
   *
   * @param {*} id
   * @returns
   */
  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      navigate("/proyectos");
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert({});
      }, 2300);
    }
  };

  /**
   *
   * @param {*} project
   * @returns
   */
  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  /**
   *
   * @param {*} project
   * @returns
   */
  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config
      );

      // synchronize state
      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setPojects(updatedProjects);

      setAlert({
        msg: "Proyecto Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/proyectos");
      }, 2300);
    } catch (error) {}
  };

  /**
   *
   * @param {*} project
   * @returns
   */
  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/projects", project, config);

      setPojects([...projects, data]);

      setAlert({
        msg: "Proyecto Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/proyectos");
      }, 2300);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {*} id
   * @returns
   */
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/projects/${id}`, config);

      const updatedProjects = projects.filter(
        (projectState) => projectState._id !== id
      );
      setPojects(updatedProjects);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/proyectos");
      }, 2300);
    } catch (error) {}
  };

  /**
   *
   * @param {*} task
   * @returns
   */
  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await newTask(task);
    }
  };

  /**
   *
   * @param {*} task
   */
  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(!modalFormTask);
  };

  /**
   *
   * @param {*} task
   */
  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  /**
   *
   * @param {*} task
   * @returns
   */
  const editTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);

      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );

      setProject(updatedProject);

      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {*} task
   * @returns
   */
  const newTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post("/tasks", task, config);

      const updatedProject = { ...project };
      updatedProject.tasks = [...project.tasks, data];

      setProject(updatedProject);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {*} task
   */
  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.filter(
        (taskState) => taskState._id !== task._id
      );

      setProject(updatedProject);

      setModalDeleteTask(false);
      setTask({});

      setTimeout(() => {
        setAlert({});
      }, 2300);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {*} email
   * @returns
   */
  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        "/projects/collaborators",
        { email },
        config
      );
      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   * @param {*} email
   * @returns
   */
  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );

      setAlert({
        msg: data.msg,
        error: false,
      });
      setCollaborator({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 2300);
    }
  };

  /**
   *
   * @returns
   */
  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const updatedProject = { ...project };
      updatedProject.collaborators = updatedProject.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator._id
      );

      setProject(updatedProject);

      setAlert({
        msg: data.msg,
        error: false,
      });
      setCollaborator({});
      setModalDeleteCollaborator(false);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 2300);
    }
  };

  /**
   *
   * @param {*} id
   * @returns
   */
  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, config);
      const updatedProject = { ...project };

      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );

      setProject(updatedProject);
    } catch (error) {
      console.log(error.response);
    } finally {
      setAlert({});

      setTask({});
    }
  };

  const closeSessionProjects = () => {
    setProject({});
    setPojects([]);
    setAlert({});
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        modalFormTask,
        handleModalTask,
        submitTask,
        handleModalEditTask,
        handleModalDeleteTask,
        modalDeleteTask,
        deleteTask,
        submitCollaborator,
        addCollaborator,
        task,
        collaborator,
        handleModalDeleteCollaborator,
        modalDeleteCollaborator,
        deleteCollaborator,
        completeTask,
        handleSearcher,
        searcher,
        closeSessionProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };

export default ProjectContext;
