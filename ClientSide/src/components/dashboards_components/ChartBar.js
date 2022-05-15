import { useEffect, useState } from "react";
import { Chart } from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

export default function ChartBar() {
  const [chartDataInvoice, setChartDataInvoice] = useState(null);
  const [chartDataExpenses, setChartDataExpenses] = useState(null);
  let config = {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Incomings",
          backgroundColor: "#03a9f4",
          borderColor: "#03a9f4",
          data: [chartDataInvoice],
          fill: false,
          barThickness: 8,
        },
        {
          label: "Expenses",
          fill: false,
          backgroundColor: "#f44336",
          borderColor: "#f44336",
          data: [chartDataExpenses],
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: false,
        text: "Orders Chart",
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      legend: {
        labels: {
          fontColor: "rgba(17,17,17,.7)",
        },
        align: "end",
        position: "bottom",
      },
      scales: {
        xAxes: [
          {
            display: false,
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(33, 37, 41, 0.3)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Value",
            },
            gridLines: {
              borderDash: [2],
              drawBorder: false,
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.2)",
              zeroLineColor: "rgba(33, 37, 41, 0.15)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        ],
      },
    },
  };
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await fetch("/myinvoices", { method: "GET" });
        const data = await response.json();
        console.log(data);
        const months = data.map(
          (invoice) =>
          (invoice.date = new Date(invoice.date).toLocaleString("default", {
            month: "long",
          }))
        );
        let invoiceObj = {};
        data.map((invoice) => {
          let finalResult = 0;
          invoice.items.map(
            (item) =>
              (finalResult += parseInt(item.hours) * parseInt(item.amount))
          );
          if (invoiceObj[invoice.date]) {
            invoiceObj[invoice.date] += finalResult;
          } else {
            invoiceObj[invoice.date] = finalResult;
          }
        });
        console.log(invoiceObj);
        config.data.labels.map((item, i) => {
          if (invoiceObj[item]) {
            config.data.datasets[0].data[i] = invoiceObj[item];
          } else {
            config.data.datasets[0].data[i] = 0;
          }
        });
        setChartDataInvoice(config);

        console.log(months);
      } catch (err) {
        console.log(err);
      }
      console.log(config.data.datasets[0].data);
    };
    setTimeout(() => {
      let ctx = document.getElementById("bar-chart").getContext("2d");
      window.myBar = new Chart(ctx, config);
    }, 500);
    getInvoices();
  }, []);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch("/getexpenses", { method: "POST" });
        const data = await response.json();
        const expensesMonth = data.data.map((expense) => (
          expense.date = new Date(expense.date).toLocaleString("default", { month: "long" })
        ))
        console.log(expensesMonth);
        let expensesObj = {};
        data.data.map((expense) => {
          let finalResult = 0;
          finalResult += parseInt(expense.amount);
          if (expensesObj[expense.date]) {
            expensesObj[expense.date] += finalResult;
          } else {
            expensesObj[expense.date] = finalResult;
          }
        })
        config.data.labels.map((item, i) => {
          if (expensesObj[item]) {
            config.data.datasets[1].data[i] = expensesObj[item];
          } else {
            config.data.datasets[1].data[i] = 0;
          }
        })
        setChartDataExpenses(config);
      } catch (err) {
        console.log(err);
      }
    }
    setTimeout(() => {
      let ctx = document.getElementById("bar-chart").getContext("2d");
      window.myBar = new Chart(ctx, config);
    }, 500);
    getExpenses();
  }, [])

  return (
    <Card>
      <CardHeader color="pink" contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6>
        <h2 className="text-white text-2xl">Sales value</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="bar-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}