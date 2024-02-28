import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LogInPage from "./pages/LogInPage/LogInPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} exact />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
