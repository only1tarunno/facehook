import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/common/Header";
import ProfileProvider from "../Provider/ProfileProvider";

const PvtRoutes = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.authtoken ? (
        <ProfileProvider>
          <Header />
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </ProfileProvider>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
};

export default PvtRoutes;
