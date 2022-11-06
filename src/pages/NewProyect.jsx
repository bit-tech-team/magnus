import ProjectForm from "../components/Project/ProjectForm";

const NewProyect = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>

      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default NewProyect;
