import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Icon from "@material-tailwind/react/Icon";
import { Button } from "@material-tailwind/react";
import useGetInvoices from "components/hooks/useGetInvoices";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";

export default function InvoiceList() {
  const [modal, setModal] = useState(false);
  const [inv, setInv] = useState({});

  let [invoices] = useGetInvoices([]);

  const downloadInvoice = async (id) => {
    const res = await fetch("/downloadinvoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ string: id }),
    });

    const reader = res.body.getReader();
    const isRead = await reader.read();
    const url = window.URL.createObjectURL(
      new Blob([isRead.value], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "yourInvoice.pdf");
    document.body.appendChild(link);
    link.click();
  };

  const doubleClickHandler = (e) => {
    e.preventDefault();
    try{
      fetch('/deleteinvoice', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({string: inv._id}),
      }).then(res => res.json())
      .then(ans => {

        if(ans.message === 'done'){
          window.location.reload();
          setInv({ });
        }

      })
      .catch(e => console.log('catch error: ', e));

    }catch(e){console.log(e)}
    setModal(false);
  }


  return (
    <>
      <Card>
        <CardHeader color="purple" contentPosition="left">
          <h2 className="text-white text-2xl">My Invoices</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            {invoices.length < 1 ? (
              "There are no Invoices in your database yet"
            ) : (
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Date
                    </th>
                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Client
                    </th>
                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Amount
                    </th>
                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Download
                    </th>
                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, i) => (
                    <tr key={i}>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {new Date(invoice.date).toLocaleDateString()}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {invoice.clientName}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {invoice.items.reduce((prev, curr) => {
                          let current = curr.hours * curr.amount;
                          return prev + current;
                        }, 0)} €
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <Button onClick={() => downloadInvoice(invoice._id)}>
                          <Icon name="download" size="sm" />
                        </Button>
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <Button onClick={(e) => {setModal(true); setInv(invoice)}}>
                          <Icon name="delete" size="sm" />
                        </Button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardBody>
      </Card>
      {modal && (
        <Modal size="sm" active={modal} toggler={() => setModal(false)}>
          <ModalHeader toggler={() => setModal(false)}>Attention</ModalHeader>
          <ModalBody>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              This action will delete automatically this invoice,including all
              data. Are you sure you want to delete it? Once done, you will not
              be able to recover it.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => {setModal(false); setInv({ })}}
              ripple="dark"
            >
              Close
            </Button>

            <Button color="green" onClick={doubleClickHandler} ripple="light">
              Delete Invoice
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}