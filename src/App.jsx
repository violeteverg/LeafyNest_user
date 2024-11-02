import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
// import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
