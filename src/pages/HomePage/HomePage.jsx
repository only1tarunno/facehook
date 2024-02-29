import Header from "../../components/common/Header";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();

  return (
    <>
      <Header />
    </>
  );
};

export default HomePage;
