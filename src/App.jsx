import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { getSessionStorageItem } from "./lib/utils";
// import HomePage from "./pages/HomePage/HomePage";

function App() {
  const location = useLocation();
  const isPaymentPage = location.pathname === "/payment";

  if (!isPaymentPage) {
    getSessionStorageItem("__Ttemp", true);
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
