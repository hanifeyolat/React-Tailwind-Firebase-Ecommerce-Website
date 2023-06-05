import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useFetchCollection from "../../fetchData/useFetchCollection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  
    const array = [];
    const orders = useFetchCollection("orders").data
    orders.map((item) => {
      return array.push(item.orderStatus);
    });
  
    const getOrderCount = (arr, value) => {
      return arr.filter((n) => n === value).length;
    };
  
    const [q1, q2, q3, q4] = [
      "Order Placed",
      "Order Ordered",
      "Order Delivered",
      "Order Shipping",
    ];
  
    const placed = getOrderCount(array, q1);
    const processing = getOrderCount(array, q2);
    const shipped = getOrderCount(array, q3);
    const delivered = getOrderCount(array, q4);
  
    const data = {
      labels: ["Placed", "Ordered", "Shipped", "Delivered"],
      datasets: [
        {
          label: "Order count",
          data: [placed, processing, shipped, delivered],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  
    return (
      <div className="w-full h-full px-5 ">
          <Bar options={options} data={data} />
      </div>
    );
  };
  
  export default Chart;
  