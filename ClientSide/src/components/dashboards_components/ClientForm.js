import {Card, CardHeader, Button, Icon, CardBody, Input, Alert, ModalFooter,
  Modal,
  ModalHeader,
  ModalBody, } from "@material-tailwind/react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "components/stateManager";
import {countries} from "../hooks/countries";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
export const ClientForm = () => {
  useContext(UserContext);
  const [resp, setResp] = useState('');
  const [resCol, setResCol] = useState('lightGreen');
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    houseNumber: "",
    city: "",
    zip: "",
    date: new Date().toISOString().slice(0, 10),
  });
  if(resp) {
    setTimeout(()=>{
        setResp('');
    }, 5000)
}
const [selectedCountry, setSelectedCountry] = useState({});


 const countryHandleOnSelect = (c) => {
   setSelectedCountry(c);
 }
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [list, setList] = useState([]);
  const [cl, setCl] = useState([]);
  const handleDataInputField = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const submitForm = async (e) => {
    e.preventDefault();
    if(inputField.name.trim() === '' || inputField.email.trim() === '' || inputField.phone.trim() === '' || inputField.address.trim() === '' || inputField.houseNumber.trim() === '' || inputField.city.trim() === ''|| inputField.zip.trim() === '' ) {
      setResCol('deepOrange');
      setResp('Please fill all the fields before adding Client.')
    } else {
      const client = {
        info: {
          fullName: inputField.name,
          email: inputField.email,
          telephone: inputField.phone,
          address: {
            address: inputField.address,
            houseNumber: inputField.houseNumber,
            city: inputField.city,
            zip: inputField.zip,
            country: selectedCountry.name,
          },
        },
      };
      fetch("/addclient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      })
        .then(res => res.json())
        .then(ans => {
          console.log('ans', ans)
        if(ans.error) {
          setResCol('deepOrange');
            setResp(ans.error[Object.keys(ans.error)[0]].message);
        } else if(ans.message){
          setShowModal(true);
        }
        })
        .catch((e) => console.log('catch error', e));
   }
  };

  const deleteClient = ()  => {
    fetch('/deleteclient', {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(cl)
    })
    .then(res => res.json())
    .then(ans => {
      if(ans.message) {
        window.location.reload();
      }
        console.log('ans', ans);
    })
    .catch(e => console.log('catch error: ', e))
  }
  useEffect(() => {
    fetch("/getclients", { method: "POST" })
      .then((res) => {res.json()
        .then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              console.log('data', data)
              setList(data)
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [])
  return (
    <>
    <div className="w-full flex flex-column flex-wrap">
      <div className="w-full lg:w-1/2 lg:px-2 text-center">      
      <Card>
        <CardHeader
          color="purple"
        >
          <h2 className="text-white text-center text-2xl">Clients Management</h2>
        </CardHeader>
        <CardBody>
          <>
            <h2 className="text-purple-500 text-md mt-3 mb-6 font-light uppercase">
              Client Information
            </h2>

            <div className="mt-10">
              
                <div>
                  <div className="w-full pr-4 mb-6 font">
                    <Input
                      type="text"
                      color="purple"
                      placeholder="Full Name"
                      outline={true}
                      name="name"
                      onChange={handleDataInputField}
                      value={inputField.name}
                      required
                    />
                  </div>
                  <div className="w-full pr-4 mb-6 font">
                    <Input
                      type="text"
                      color="purple"
                      placeholder="Email"
                      outline={true}
                      name="email"
                      onChange={handleDataInputField}
                      value={inputField.email}
                      required
                    />
                  </div>
                  <div className="w-full pr-4 mb-6 font">
                    <Input
                      type="number"
                      color="purple"
                      placeholder="Phone"
                      outline={true}
                      name="phone"
                      onChange={handleDataInputField}
                      value={inputField.phone}
                    />
                  </div>
                  <div className="flex">
                    <div className="w-full pr-4 mb-6 font">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="Address"
                        outline={true}
                        name="address"
                        onChange={handleDataInputField}
                        value={inputField.address}
                        required
                      />
                    </div>
                    <div className="w-full pr-4 mb-6 font">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="House Nr."
                        outline={true}
                        name="houseNumber"
                        onChange={handleDataInputField}
                        value={inputField.houseNumber}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full pr-4 mb-6 font">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="City"
                        outline={true}
                        name="city"
                        onChange={handleDataInputField}
                        value={inputField.city}
                        required
                      />
                    </div>
                    <div className="w-full pr-4 mb-6 font">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="Zip"
                        outline={true}
                        name="zip"
                        onChange={handleDataInputField}
                        value={inputField.zip}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full pr-4 mb-6 font">
                  <header className="App-header">
        <div >
          <ReactSearchAutocomplete
            items={countries}
            onSelect={countryHandleOnSelect}
            placeholder="Country"
          />
        </div>
      </header>
                  </div>
                </div>
            </div>
            
            <Button
              color="lightBlue"
              ripple="light"
              buttonType="filled"
              size="lg"
              block={true}
              onClick={submitForm}
              className="z-0"
            >
              Add client
            </Button>
          </>
          <div  className={resp ? 'mt-2' : 'invisible'}>
                <Alert color={resCol} margin='auto'>{resp}</Alert>
                </div>
        </CardBody>
      </Card></div>
      <div className="w-full lg:w-1/2 lg:px-2 text-center">      <Card>
        <CardHeader className="bg-grey-900" color="purple" contentPosition="none">
          <h2 className="text-white text-center text-2xl">My Clients</h2>
        </CardHeader>
        <CardBody>
          <div className="mt-10">
            <table className="items-center w-full bg-transparent border-collapse table-fixed">
              <thead>
                <tr>
                  <th className="px-1 text-sky-500 align-middle border-b border-solid border-grey-500 py-4 text-sm whitespace-nowrap font-light text-left">
                    Name
                  </th>
                  <th className="px-1 text-sky-500 align-middle border-b border-solid border-grey-500 py-4 text-sm whitespace-nowrap font-light text-left">
                    Email
                  </th>
                  <th className="px-1 text-sky-500 align-middle border-b border-solid border-grey-500 py-4  text-sm whitespace-nowrap  font-light text-left">
                    Location
                  </th>
                  <th className="px-3.5 text-sky-500 align-middle border-b border-solid border-grey-500 text-sm whitespace-nowrap font-light text-left">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-grey-500 align-middle text-sm whitespace-wrap px-2 py-4 text-left truncate text-clip overflow-hidden ... capitalize">
                        {item.fullName}
                      </td>
                      <td className="border-b border-grey-500 align-middle text-sm whitespace-nowrap px-2 py-4 text-left truncate text-clip overflow-hidden ...">
                        {item.email}
                      </td>
                      <td className="border-b border-grey-500 align-middle text-sm whitespace-nowrap px-0 py-4 text-left truncate text-clip overflow-hidden ... capitalize">
                        {item.address.city}{', '}{item.address.country}
                      </td>
                      <td className="border-b border-grey-500 text-sm text-center">
                        <Button
                          
                          color="lightBlue"
                          ripple="light"
                          buttonType="filled"
                          size="md"
                          type="submit"
                          onClick={(e) => {
                            setCl(item);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Icon name="delete" size="sm" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      </div>

    </div>

    {showDeleteModal && (
                  <Modal
                    active={showDeleteModal}
                    toggler={() => setShowDeleteModal(false)}
                  >
                    <ModalHeader toggler={() => setShowDeleteModal(false)}>
                      <p>Warning !</p>
                    </ModalHeader>
                    <ModalBody>
                      <p className="text-base leading-relaxed text-gray-600 font-normal">
                        This Client will be removed permanently. 
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="green"
                        buttonType="link"
                        onClick={(e) => setShowDeleteModal(false)}
                        ripple="dark"
                      >
                        Do not Delete
                      </Button>

                      <Button
                        color="red"
                        buttonType="link"
                        onClick={(e) => {
                          deleteClient();
                          setShowDeleteModal(false)
                        }}
                        ripple="dark"
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </Modal>
                )}


      {showModal && (
        <Modal size="sm" active={showModal} toggler={() => {
          setShowModal(false)
          window.location.reload();
          }}>
          <ModalHeader toggler={() => {
            setShowModal(false)
            window.location.reload();
            }}>
            Client Added !
          </ModalHeader>
          <ModalBody>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
            This client has been stored successfully. You can start generating invoices for this client in "CREATE INVOICE" section.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => {
                setShowModal(false);
                window.location.reload();
              }}
              ripple="dark"
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
