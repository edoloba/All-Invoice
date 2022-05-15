import React, { useState, useEffect } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Icon from "@material-tailwind/react/Icon";
import { Textarea } from "@material-tailwind/react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

export default function AddExpenses() {
  const [inputFields, setInputFields] = useState({
    date: new Date(),
    companyName: "",
    description: "",
    amount: "",
  });
  const [list, setList] = useState([]);
  const [exp, setExp] = useState({});
  console.log(exp);
  const [showModal, setShowModal] = useState(false);

  const onUpload = (e) => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      date: inputFields.date,
      companyName: inputFields.companyName,
      description: inputFields.description,
      amount: inputFields.amount,
      hidden: false,
    };
    try {
      fetch("/addexpenses", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      })
        .then((res) => res.json())
        .then((ans) => {
          console.log(ans);

          setInputFields({
            date: "",
            companyName: "",
            description: "",
            amount: "",
          });
          window.location.reload();
        })
        .catch((e) => console.log("catch error: ", e));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch("/getexpenses", { method: "POST" })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              console.log("data", data);
              setList(data.data);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const doubleEventOnDelete = (e) => {
    e.preventDefault();
    try {
      fetch("/deleteexpense", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: exp.id }),
      })
        .then((res) => res.json())
        .then((ans) => {
          console.log(ans);

          setExp({});
          window.location.reload();
        })
        .catch((e) => console.log("catch error: ", e));
    } catch (e) {
      console.log(e);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full flex flex-column flex-wrap">
        <div className="w-full lg:w-1/2 lg:px-2 text-center">
          <Card className=" min-w-px-750">
            <CardHeader
              className="bg-grey-900"
              color="purple"
              contentPosition="none"
            >
              <h2 className="text-white text-center md:text-4xl sm:text-3xl xs:text-2xl">Add Expenses</h2>
            </CardHeader>

            <CardBody>
              <form>
                <h6 className="text-purple-500 text-md mt-3 mb-6 font-light uppercase">
                  Expenses Information
                </h6>
              </form>
            </CardBody>
            <div className="pt-5 mx-auto">
              <div className="flex justify-between flex-wrap">
                <div className="mb-10 font-light">
                  <Input
                    type="date"
                    color="purple"
                    placeholder="Date"
                    outline={true}
                    name="date"
                    onChange={(e) =>
                      setInputFields({ ...inputFields, date: e.target.value })
                    }
                    value={inputFields.date}
                    required
                  />
                </div>
                <div className="w-2/3 mb-10 font-light">
                  <Input
                    type="text"
                    color="purple"
                    placeholder="Company Name"
                    outline={true}
                    name="companyName"
                    onChange={(e) =>
                      setInputFields({
                        ...inputFields,
                        companyName: e.target.value,
                      })
                    }
                    value={inputFields.companyName}
                  />
                </div>
                <div className="w-2/3 mb-10 font-light">
                  <Input
                    type="text"
                    color="purple"
                    placeholder="Description"
                    outline={true}
                    name="description"
                    onChange={(e) =>
                      setInputFields({
                        ...inputFields,
                        description: e.target.value,
                      })
                    }
                    value={inputFields.description}
                  />
                </div>
                <div className="w-2/3 pr-1 mb-10 font-light">
                  <Input
                    type="number"
                    color="purple"
                    placeholder="Amount"
                    outline={true}
                    name="amount"
                    value={inputFields.amount}
                    onChange={(e) =>
                      setInputFields({ ...inputFields, amount: e.target.value })
                    }
                  />
                </div>
                
                <div className="w-full lg:w-6/12 pr-1 mb-10 font-light">
                  <Button
                    variant="contained"
                    component="label"
                    type="submit"
                    onClick={onUpload}
                    color="lightBlue"
                    size="sm"
                  >
                    Add Expense
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full lg:w-1/2 lg:px-2 text-center">
          <Card className="min-w-px-750">
            <CardHeader
              className="bg-grey-900"
              color="purple"
              contentPosition="none"
            >
              <h2 className="text-white text-center md:text-4xl sm:text-3xl xs:text-2xl">Expenses</h2>
            </CardHeader>
            <CardBody>
              <div className="mt-10 overflow-x-auto  ">
                <table className="items-center  w-full bg-transparent border-collapse table-auto">
                  <thead>
                    <tr>
                      <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        Date
                      </th>
                      <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        Company Name
                      </th>
                      <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        Description
                      </th>
                      <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                        Amount
                      </th>
                      <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {item.date}
                          </td>
                          <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {item.companyName}
                          </td>
                          <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {item.description.length > 30
                              ? item.description.slice(0, 30)
                              : item.description}
                          </td>
                          <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {item.amount} €
                          </td>
                          {/* <td>
                        <Button
                          color="lightBlue"
                          ripple="light"
                          buttonType="filled"
                          size="sm"
                          rounded={false}
                          block={true}
                          iconOnly={false}
                          type="submit"
                        >
                          Download Bill
                        </Button>
                      </td> */}
                          <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            <Button
                              color="lightBlue"
                              ripple="light"
                              buttonType="filled"
                              size="sm"
                              rounded={false}
                              block={true}
                              iconOnly={false}
                              type="submit"
                              onClick={(e) => {
                                setExp(item);
                                setShowModal(true);
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
      {showModal && (
        <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
          <ModalHeader toggler={() => setShowModal(false)}>
            Attention
          </ModalHeader>
          <ModalBody>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              This action will delete automatically this expense,including all
              data. Are you sure you want to delete this expense? Once deleted,
              you will not be able to recover it.
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

            <Button color="green" onClick={doubleEventOnDelete} ripple="light">
              Delete Expense
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
