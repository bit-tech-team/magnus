import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";
import ConfirmAccount from "./pages/auth/ConfirmAccount";

import { AuthProvider } from "./context/AuthProvider";
import { ProjectProvider } from "./context/ProjectProvider";

import ProtectedRoute from "./layouts/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProyect from "./pages/NewProyect";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import NewCollaborator from "./pages/NewCollaborator";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/auth/magnus" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<SignIn />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/proyectos" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="crear-proyecto" element={<NewProyect />} />
              <Route path="nuevo-colaborador/:id" element={<NewCollaborator />} />
              <Route path="editar/:id" element={<EditProject />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
