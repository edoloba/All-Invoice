import React, { useState } from "react";
import { Button, CardBody } from "@material-tailwind/react";
import SettingsForm from "./SettingsForm";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

export const SavedAccount = (props) => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onEditSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    return {
      fName: props.fNameInput,
      lName: props.lNameInput,
      email: props.emailInput,
      phone: props.phoneInput,
      address: props.addressInput,
      houseNumber: props.houseNumberInput,
      city: props.cityInput,
      zipCode: props.zipCodeInput,
      country: props.countryInput,
      bankInput: props.bankInput,
      ibanInput: props.ibanInput,
      bicInput: props.bicInput,
    };
  };
  const confirmDelete = (e) => {
    e.preventDefault();
    setShowModal(false);
    onEditSubmit(e);
  }
  
  return (
    <>
      {!show && (
        <Card>
          <CardHeader color="purple" contentPosition="none">
            <h2 className="text-white text-4xl text-center">User Settings</h2>
          </CardHeader>
          <CardBody>
            <div className="mt-10">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                      Full Name
                    </th>
                    <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                      Email
                    </th>
                    <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                      Bank
                    </th>
                    <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                      Iban
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {props.fNameInput} {props.lNameInput}
                    </th>
                    <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {props.emailInput}
                    </td>
                    <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {props.bankInput}
                    </td>
                    <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {props.ibanInput}
                    </td>
                    <td>
                      <Button
                        color="lightBlue"
                        ripple="light"
                        buttonType="filled"
                        size="sm"
                        rounded={false}
                        block={true}
                        iconOnly={false}
                        type="submit"
                        onClick={onEditSubmit}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="lightBlue"
                        ripple="light"
                        buttonType="filled"
                        size="sm"
                        rounded={false}
                        block={true}
                        iconOnly={false}
                        type="submit"
                        onClick={(e) => setShowModal(true)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
      {show && <SettingsForm />}
      <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader toggler={() => setShowModal(false)}>
          Account
        </ModalHeader>
        <ModalBody>
          <p className="text-base leading-relaxed text-gray-600 font-normal">
            This action will delete automatically your account and its history including all data. Are you sure you want to delete your account? Once deleted, you will not be able to recover it.
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

          <Button
            color="green"
            onClick={confirmDelete}
            ripple="light"
          >
            Delete Account
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
