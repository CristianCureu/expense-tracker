import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],
        backgroundColor: "rgba(186, 0, 0, 1)",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Bar data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: rgb(30, 30, 30);
  border: 2px solid rgba(79, 79, 79, 0.8);
  box-shadow: 0px 1px 15px rgba(175, 175, 175, 0.1);
  border-radius: 10px;
  padding: 1rem;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Chart;
