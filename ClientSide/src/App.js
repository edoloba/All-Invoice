import { Routes, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import AccountSettings from "pages/AccountSettings";
import MyInvoices from "pages/MyInvoices";
import Landing from "pages/Landing";
import Login from "pages/Login";
import Register from "pages/Register";
import AboutUs from "pages/AboutUs";
import CreateInvoice from "pages/CreateInvoice";
import Expenses from "pages/Expenses";
import Clients from "pages/Clients";
import { UserProvider } from "./components/stateManager";


// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";


function App() {
 
  return (
    <UserProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/createinvoice"  element={<CreateInvoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/myinvoices" element={<MyInvoices />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="*" element={<Landing />} />
        </Routes>
    </UserProvider>
  );
}

export default App;
