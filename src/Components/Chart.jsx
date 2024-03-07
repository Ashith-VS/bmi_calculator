import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);
const Chartt = () => {
  const options = {
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        enabled: true
      }
    },
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    maintainAspectRatio: true,
    responsive: true,
  };
  

  const data = {
    labels:["underWeight","Normal","overWeight","obesity"],
    datasets: [
      {
        data: [ 18.5, 25, 30,  40,], 
        backgroundColor: [
          "#336699",
          "#99CCFF",
          "#999933",
          "#666699",
          "#CC9933",
        ],
        display: true,
        borderWidth: 1,
        borderColor: "#D1D6DC"
      }
    ]
  };

  return (
    <div style={{ height: "400px" ,display:"flex",justifyContent:"center" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Chartt;
