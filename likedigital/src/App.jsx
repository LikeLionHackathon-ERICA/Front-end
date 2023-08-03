import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="relative">
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default App;
