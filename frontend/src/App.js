import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/TopNav/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';
import TicketForm from './pages/TicketForm';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Tickets from './pages/Tickets';
import axiosInterceptor from './axios/axiosInterceptor';
import TicketPage from './pages/TicketPage';

const App = () => {
  // initialize axios interceptor with store
  axiosInterceptor(store);

  return (
    <div className="min-h-screen flex flex-col text-sm">
      <BrowserRouter>
        <Provider store={store}>
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
        </Provider>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
