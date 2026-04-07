import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { Navbar } from "shared/components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
