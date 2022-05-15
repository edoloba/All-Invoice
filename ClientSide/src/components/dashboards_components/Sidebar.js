import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";

export default function Sidebar() {
  let navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const logOut = () => {
    fetch("/logout", { method: "GET" })
      .then((res) => {
        res
          .json()
          .then((ans) => {
            console.log(ans);
            if (!ans.error) {
              navigate("landing");
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-2xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <a href="dashboard" target="" rel="noreferrer" className="mt-2 text-center w-full inline-block">
            <H6 color="gray">All-Invoice</H6>
          </a>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/dashboard"
                  
                  className="flex items-center gap-4 text-sm text-black-800 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="dashboard" size="2xl" />
                  Dashboard
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/createinvoice"
                  className="flex items-center gap-4 text-sm text-black-800 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="assignment" size="2xl" />
                  Create Invoice
                </NavLink>
              </li>
              
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/myinvoices"
                  className="flex items-center gap-4 text-sm text-black-800 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="storage" size="2xl" />
                  My Invoices
                </NavLink>
              </li>
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/clients"
                  className="flex items-center gap-4 text-sm text-black-800 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="people_outline" size="2xl" />
                  My Clients
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/expenses"
                  className="flex items-center gap-4 text-sm text-black-800 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="payment" size="2xl" />
                  Upload Expenses
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/accountsettings"
                  className="flex items-center gap-4 text-sm text-black-800 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="account_circle" size="2xl" />
                  Account Settings
                </NavLink>
              </li>
            </ul>

            <ul className="flex-col  min-w-full  flex list-none ">
              <li className="bg-gradient-to-tr from-sky-500 to-sky-800 px-4 rounded-lg text-white mb-2">
                <a href="/" target="" rel="noreferrer" className="flex items-center gap-4 text-sm font-light py-1">
                  <span className="flex items-center gap-4 text-sm font-light py-3 cursor-pointer" onClick={logOut}>
                    <Icon name="description" size="2xl" />
                    Log Out
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
