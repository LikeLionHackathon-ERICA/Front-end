import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import { AuthProvider } from "./hook/useAuthToken";
function App() {
  return (
    <AuthProvider>
      <div className="relative">
        <Outlet />
        <BottomNav />
      </div>
    </AuthProvider>
  );
}
export default App;
