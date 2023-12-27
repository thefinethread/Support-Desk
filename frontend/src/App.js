import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/TopNav/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/store";
import TicketForm from "./pages/TicketForm";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Tickets from "./pages/Tickets";
import axiosInterceptor from "./axios/axiosInterceptor";
import TicketPage from "./pages/TicketPage";
import useDarkMode from "./hooks/useDarkMode";

const App = () => {
  // initialize axios interceptor with store
  axiosInterceptor(store);

  const { darkTheme } = useDarkMode();

  return (
    <div className="flex min-h-screen flex-col bg-white text-sm dark:bg-zinc-900 dark:text-zinc-100 ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<PrivateRoute />}>
            <Route path="new-ticket" element={<TicketForm />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="ticket/:ticketId" element={<TicketPage />} />
          </Route>
        </Routes>
        <ToastContainer autoClose={2000} theme={darkTheme ? "dark" : "light"} />
      </BrowserRouter>
    </div>
  );
};

export default App;
