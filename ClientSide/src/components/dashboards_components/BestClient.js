import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { useEffect, useState } from "react";

export default function BestClient() {
  const [invoices, setInvoices] = useState([]);
  const newArr = [];
  useEffect(() => {
    const getData = async () => {
  
      try {
        const response = await fetch("/myinvoices", { method: "GET" });
      const data = await response.json();
      if (data) {
        data.map((ele) => {
          ele.items.map((e) => {
            const taskObj = {
              client: ele.client,
              amount: e.amount,
            };
            if (!newArr.find((task) => task.client === ele.client)) {    
            newArr.push(taskObj);}
          });
          
        })
        const resultArr = [];
        for (let i = 0; i < newArr.length; i++) {
          if (resultArr.length === 0) {
            resultArr.push(newArr[i]);
          } else {
            for (let j = 0; j < resultArr.length; j++) {
              if (newArr[i].client === resultArr[j].client) {
                newArr[i].amount += resultArr[j].amount;
                resultArr.push(newArr[i]);
                break;
              } else if (j === resultArr.length - 1) {
                resultArr.push(newArr[i]);
                break;
              }
            }
          }
        }
        const s = data.sort((a, b) => b.items.amount - a.items.amount );
       
        setInvoices(s);
        // console.log(s);
      }
      
    } catch (err) {
      console.log(err);
    }
    // return [invoices]
  }
  getData();
}, [])
 
  return (
    <Card>
      <CardHeader color="" className="bg-blue-600" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Best Clients</h2>
          {/* <Button color="transparent" buttonType="link" size="lg" style={{ padding: 0 }}>
            See More
          </Button> */}
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          {invoices.length < 1 ? "There are no data to display yet" : 
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                  Client
                </th>
                <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                  Amount
                </th>
                <th className="px-2 text-sky-500 align-middle border-b border-solid border-grey-500 py-3 text-sm whitespace-nowrap font-light text-left">
                  Invoice Date
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map((invoice, i) => (
              <tr key={i}>
                <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {invoice.clientName}
                </td>
                <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {invoice.items.reduce((prev, curr) => {
                      let current = curr.hours * curr.amount;
                      return prev + current;
                    }, 0)} €
                </td>
                <td className="border-b border-grey-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {new Date(invoice.date).toLocaleDateString()}
                </td>
              </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </CardBody>
    </Card>
  );
}
