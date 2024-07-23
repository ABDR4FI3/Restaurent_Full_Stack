import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../../assets/icon/SamLogo.png";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import { Link } from "react-router-dom";

const DashboardNav: React.FC = () => {
  const dispatch = useDispatch();

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <nav className="flex justify-between items-center bg-dark-bg text-white p-4 h-20">
      <div className="flex gap-10 items-center">
        <FaBars
          className="text-2xl cursor-pointer mr-4"
          onClick={handleToggleDrawer}
        />
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex items-center gap-5">
        <div className="relative">
          <FaBell
            size={28}
            className="text-2xl cursor-pointer mr-4"
            onClick={() => console.log("Notifications clicked")}
          />{" "}
          <div className="absolute bottom-5 left-5 rounded_close_btn bg-red-600 text-white w-6 h-6 flex justify-center items-center">
            1
          </div>
        </div>
        <Link to="/profile">
          <div className="flex items-center">
            <span className="mr-2">John Doe</span>
            <FaUserCircle size={28} className="text-2xl" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNav;