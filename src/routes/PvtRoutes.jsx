import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/common/Header";
import ProfileProvider from "../Provider/ProfileProvider";
import PostProvider from "../Provider/PostProvider";

const PvtRoutes = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.authtoken ? (
        <PostProvider>
          <ProfileProvider>
            <Header />
            <main className="mx-auto max-w-[1020px] py-8">
              <div className="container">
                <Outlet />
              </div>
            </main>
          </ProfileProvider>
        </PostProvider>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
};

export default PvtRoutes;
