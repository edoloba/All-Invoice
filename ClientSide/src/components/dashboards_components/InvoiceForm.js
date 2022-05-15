import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import Icon from "@material-tailwind/react/Icon";
import { useState, useContext } from "react";
import { UserContext } from "components/stateManager";
import Alert from "@material-tailwind/react/Alert";
import { Link } from "react-router-dom";
import {
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "@material-tailwind/react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
export const InvoiceForm = () => {
  useContext(UserContext);
  const [resp, setResp] = useState("");
  const [resCol, setResCol] = useState("lightGreen");
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    houseNumber: "",
    city: "",
    zip: "",
    country: "",
    date: new Date().toISOString().slice(0, 10),
    invoiceNr: "",
    message: "",
  });
  if (resp) {
    setTimeout(() => {
      setResp("");
    }, 5000);
  }

  const [items, setItems] = useState([]);
  const [selectedClient, setSelectedClient] = useState(false);

  const clientHandleOnSelect = (item) => {
    setSelectedClient(item);
  };
  const clientHandleOnFocus = () => {
    fetch("/getclients", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((ans) => {
        let c = [];
        ans.map((cl) =>
          c.push({ id: cl._id, name: cl.fullName, email: cl.email })
        );
        setItems(c);
      })
      .catch((e) => console.log("catch error", e));
  };

  const [showModal, setShowModal] = useState(false);
  const [showListItem, setShowListItem] = useState({
    description: "",
    hours: "",
    amount: "",
    tax: "",
  });
  const [showModalItem, setShowModalItem] = useState(false);
  const [newListArray, setNewListArray] = useState([]);
  const [showHeaderForListItem, setShowHeaderForListItem] = useState(false);

  const addItem = (e) => {
    e.preventDefault();
    if (
      showListItem.description.trim() === "" ||
      showListItem.hours === "" ||
      showListItem.amount === ""
    ) {
      setShowModalItem(true);
    } else {
      setNewListArray((arr) => [...arr, showListItem]);
      setShowListItem({ description: "", hours: "", amount: "", tax: "" });
      setShowHeaderForListItem(true);
    }
  };
  const removeItem = (item) => {
    item.preventDefault();
    const index = item.target.dataset.index;
    const list = [...newListArray];
    list.splice(index, 1);
    setNewListArray(list);
    if (newListArray.length === 1) {
      setShowHeaderForListItem(false);
    }
  };
  const handleDataInputField = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDataListItem = (e) => {
    const { name, value } = e.target;
    setShowListItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (newListArray.length < 1) {
      setResCol("deepOrange");
      setResp('Please fill Invoice details and press "+" button. ');
    } else {
      const client = {
        info: {
          fullName: selectedClient.name,
          email: selectedClient.email,
        },
        invoice: {
          items: newListArray.map((item) => item),
          date: inputField.date,
          message: inputField.message,
          invoiceNumber: Date.now(),
          clientName: selectedClient.name,
        },
      };
      console.log(client);
      fetch("/createinvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      })
        .then((res) => res.json())
        .then((ans) => {
          console.log("ans", ans);
          if (ans.error) {
            setResCol("deepOrange");
            setResp(ans.error[Object.keys(ans.error)[0]].message);
          } else if (ans.message) {
            setShowModal(true);
            setInputField({
              name: "",
              email: "",
              phone: "",
              address: "",
              houseNumber: "",
              city: "",
              zip: "",
              country: "",
              date: new Date().toISOString().slice(0, 10),
              invoiceNr: "",
              message: "",
            })
            setNewListArray([]);
            setSelectedClient(false);
            setShowHeaderForListItem(false);
            setItems([]);
          }
        })
          .then((res) => res.json())
          .then((ans) => {
            console.log("ans", ans);
            if (ans.error) {
              setResCol("deepOrange");
              setResp(ans.error[Object.keys(ans.error)[0]].message);
            } else if (ans.message) {
              setShowModal(true);
              setNewListArray([]);
            }
          })
          .catch((e) => console.log("catch error", e));
      }

    }
  return (
    <>
      <Card>
        <CardHeader
          className="bg-grey-900"
          color="purple"
          contentPosition="none"
        >
          <h2 className="text-white  text-center md:text-4xl sm:text-3xl xs:text-2xl">
            Create Invoice
          </h2>
        </CardHeader>
        <CardBody>
          <form>
            <h2 className="text-purple-500 text-md mt-3 mb-6 font-light uppercase">
              Client Information
            </h2>

            <div className="mt-10">
              <div className="flex flex-col">
                <div className="lg:w-3/12 mb-10 font-light">
                  <header className="App-header">
                    <div>
                      <ReactSearchAutocomplete
                        items={items}
                        onSelect={clientHandleOnSelect}
                        onFocus={clientHandleOnFocus}
                        placeholder="Saved Clients"
                      />
                    </div>
                  </header>
                  {selectedClient && (
                    <div className="m-2">
                      <Label color="lightBlue" className="cursor-pointer">
                        Invoice to: {selectedClient.name}{" "}
                        <Icon
                          onClick={() => setSelectedClient(false)}
                          name="close"
                          size="sm"
                        />
                      </Label>
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-2/6 mb-10 font-light">
                  <Link to="/clients">
                    <Button
                      color="lightBlue"
                      buttonType="filled"
                      block={false}
                      iconOnly={false}
                      ripple="dark"
                    >
                      Add new Client
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <h2 className="text-purple-500 text-md my-6 font-light uppercase">
              Invoice Details
            </h2>
            <div className="mt-10 overflow-x-auto">
              <div className="flex">
                <div className="w-full lg:w-3/12 pr-4 mb-10 font-light">
                  <Input
                    type="date"
                    color="purple"
                    placeholder="Date"
                    outline={true}
                    selected={inputField.date}
                    name="date"
                    onChange={handleDataInputField}
                    value={inputField.date}
                    required
                  />
                </div>
              </div>
              <div className="w-small lg:w-5/12 pr-4 mb-10 font-light">
                <Textarea
                  type="text"
                  color="purple"
                  placeholder="Message"
                  size="regular"
                  outline={true}
                  name="message"
                  onChange={handleDataInputField}
                  value={inputField.message}
                />
              </div>

              <div className="flex flex-wrap">
                <div className="w-full  lg:w-4/12 pr-4 mb-10 font-light">
                  <Input
                    type="text"
                    color="purple"
                    placeholder="Description"
                    outline={true}
                    name="description"
                    onChange={handleDataListItem}
                    value={showListItem.description}
                    required
                  />
                </div>
                <div className="w-full lg:w-2/12 pr-4 mb-10 font-light">
                  <Input
                    type="number"
                    color="purple"
                    placeholder="Unit/Hours"
                    outline={true}
                    name="hours"
                    onChange={handleDataListItem}
                    value={showListItem.hours}
                    required
                  />
                </div>
                <div className="w-full lg:w-2/12 pr-4 mb-10 font-light">
                  <Input
                    type="number"
                    color="purple"
                    placeholder="Amount €"
                    outline={true}
                    name="amount"
                    onChange={handleDataListItem}
                    value={showListItem.amount}
                  />
                </div>
                <div className=" lg:w-1/12 pr-4 mb-10 font-light">
                  <Input
                    type="number"
                    color="purple"
                    placeholder="Tax %"
                    outline={true}
                    name="tax"
                    onChange={handleDataListItem}
                    value={showListItem.tax}
                  />
                </div>
                <div className="w-full lg:w-1/12 font-light">
                  <Button onClick={addItem}>
                    <Icon name="add" size="sm" />
                  </Button>
                </div>

                {showModalItem && (
                  <Modal
                    active={showModalItem}
                    toggler={() => setShowModalItem(false)}
                  >
                    <ModalHeader toggler={() => setShowModalItem(false)}>
                      <p>Warning</p>
                    </ModalHeader>
                    <ModalBody>
                      <p className="text-base leading-relaxed text-gray-600 font-normal">
                        Please fill all the fields before adding.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModalItem(false)}
                        ripple="dark"
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                )}
              </div>

              <table className=" items-center w-full bg-transparent border-collapse">
                <thead>
                  {showHeaderForListItem && (
                    <tr>
                      <th className="  px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        <h2 className="text-base leading-relaxed font-normal">
                          Description
                        </h2>
                      </th>
                      <th className=" px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        <h2 className="text-base leading-relaxed font-normal">
                          Hours
                        </h2>
                      </th>
                      <th className=" px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        <h2 className="text-base leading-relaxed font-normal">
                          Amount
                        </h2>
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {newListArray.map((items, i) => (
                    <tr key={i}>
                      <td className="px-2  text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        <h2 className="text-base capitalize leading-relaxed text-gray-600 font-normal">
                          {items.description}
                        </h2>
                      </td>
                      <td className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        <h2
                          className="text-base leading-relaxed text-gray-600 
                  font-normal"
                        >
                          {items.hours}
                        </h2>
                      </td>
                      <td className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        <h2 className="text-base leading-relaxed text-gray-600">
                          {items.amount} €
                        </h2>
                      </td>

                      <Button
                        className="pr-0 m-auto font-light"
                        color="lightBlue"
                        buttonType="filled"
                        size="regular"
                        block={false}
                        iconOnly={true}
                        ripple="dark"
                        onClick={removeItem}
                        data-index={i}
                      >
                        <Icon name="remove" size="sm" />
                      </Button>

                      {/* <td className=" pr-4 mb-10 font-light">
                        <Button
                          color="lightBlue"
                          buttonType="filled"
                          size="regular"
                          block={false}
                          iconOnly={true}
                          ripple="dark"
                          onClick={removeItem}
                          data-index={i}
                        >
                          <Icon name="remove" size="sm" />
                        </Button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10">
              <Button
                color="lightBlue"
                ripple="light"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={true}
                iconOnly={false}
                type="submit"
                onClick={submitForm}
              >
                Create Invoice
              </Button>
            </div>
          </form>
          <div className={resp ? "mt-2" : "invisible"}>
            <Alert color={resCol} margin="auto">
              {resp}
            </Alert>
          </div>
        </CardBody>
      </Card>
      {showModal && (
        <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
          <ModalHeader toggler={() => setShowModal(false)}>
            Invoice Created
          </ModalHeader>
          <ModalBody>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Your invoice has been created successfully, stored in "My
              Invoices" and ready to be sent.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => setShowModal(false)}
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
