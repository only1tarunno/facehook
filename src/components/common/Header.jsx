import notification from "../../assets/icons/notification.svg";
import home from "../../assets/icons/home.svg";
import logout from "../../assets/icons/logout.svg";
import avatar from "../../assets/images/avatars/avatar_1.png";
import logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* <!-- Logo --> */}
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={logo}
          />
        </Link>
        {/* <!-- nav links  --> */}

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={home} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={notification} alt="Notification" />
          </button>
          <button onClick={handleLogOut} className="icon-btn">
            <img src={logout} alt="Logout" />
          </button>

          <Link to="/profile" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {auth?.user?.firstName}
            </span>
            <img
              className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={avatar}
              alt=""
            />
          </Link>
        </div>
        {/* <!-- nav links ends --> */}
      </div>
    </nav>
  );
};

export default Header;
