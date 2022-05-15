import SettingsForm from "components/dashboards_components/SettingsForm";
import Sidebar from "components/dashboards_components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "components/stateManager";



export default function AccountSettings() {
  let navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const {dispatch} = useContext(UserContext);
  useEffect(() => {
    fetch("/userlogin", { method: "POST" })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (data.error) {
              console.log(data.error);
              navigate("/login");
            } else {
             dispatch({type: 'user', payLoad: data.message})
              setLoaded(true);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [dispatch, navigate]);

  if (loaded) {

    return (
      <div className="md:ml-64 bg-gradient-to-b from-cyan-500 to-blue-500 ">
      <Sidebar />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <SettingsForm />
          </div>
        </div>
      </div>
    </div>
       
              );
            } else {
              return (
                <div className="relative mt-5">
                  <button type="button" className=" w-5 fixed inset-x-2/4" disabled>
                    <svg className="bg-indigo-500 animate-spin h-8 w-8" viewBox="0 0 24 24"></svg>
                    <p className="mt-5">Loading...</p>
                  </button>
                </div>
              );
            }
          }
