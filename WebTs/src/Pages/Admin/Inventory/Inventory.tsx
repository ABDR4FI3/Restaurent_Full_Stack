import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import { RootState } from "../../../store";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";
import { toggleDrawer } from "../../../store/slices/drawerSlice";

const Inventory: React.FC = () => {
      const dispatch = useDispatch();
      const isDrawerOpen = useSelector(
        (state: RootState) => state.drawer.isDrawerOpen
      );

      return (
        <div className="flex flex-col h-screen">
          <DashboardNav />
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => dispatch(toggleDrawer())}
          />
        </div>
      );
};
export default Inventory;