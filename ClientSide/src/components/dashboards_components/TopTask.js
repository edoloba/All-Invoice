import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { useEffect, useState } from "react";

export default function TopTask() {
  const [tasks, setTasks] = useState([]);
  const newArr = [];
  useEffect(() => {
    (async function topTask() {
      const response = await fetch("/myinvoices", { method: "GET" });
      response
        .json()
        .then(
          (data) => {
            data.map((ele) => {
              ele.items.map((e) => {
                const taskObj = {
                  description: e.description,
                  hours: e.hours,
                  amount: e.amount,
                };
                if (!newArr.find((task) => task.description === e.description)) {    
                 newArr.push(taskObj);}
              });
              
            });
            const resultArr = [];
            for (let i = 0; i < newArr.length; i++) {
              if (resultArr.length === 0) {
                resultArr.push(newArr[i]);
              } else {
                for (let j = 0; j < resultArr.length; j++) {
                  if (newArr[i].description === resultArr[j].description) {
                    newArr[i].hours += resultArr[j].hours;
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
            resultArr.sort((a, b) => b.hours - a.hours)
            setTasks(resultArr.slice(0, 5));
          }
        )
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [newArr]);
 
  return (
    <>
    <Card>
      <CardHeader color="purple" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Top Task</h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          {!tasks ? (
            "There are no task to display yet"
          ) : (
            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="thead-light">
                <tr>
                  <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Task
                  </th>
                  <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                    Hours / Units
                  </th>
                  <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((ele, i) => <tr key={i}>
                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {ele.description.slice(0, 25).toUpperCase()}
                    </th>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                      {ele.hours}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                      {ele.amount} €
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </CardBody>
    </Card>
    </>
  );
}
