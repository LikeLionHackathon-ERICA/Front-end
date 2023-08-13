import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import { AuthProvider } from "./hook/useAuthToken";
import { ProfileProvider } from "./context/ProfileProvider";
function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <div className="relative">
          <Outlet />
          <div className="pb-16">
            <BottomNav />
          </div>
        </div>
      </ProfileProvider>
    </AuthProvider>
  );
}
export default App;
