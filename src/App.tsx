import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { Navbar } from "shared/components/navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Navbar />
      <AppRoutes />
    </>
  );
}


export default App;
