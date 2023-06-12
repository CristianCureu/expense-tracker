import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard({ active }) {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="stats-con">
          {active === 1 && (
            <div className="history-con">
              <History />
              <div className="salary">
                <h2 className="salary-title">
                  Min <span>Salary</span>Max
                </h2>
                <div className="salary-item">
                  <p>${Math.min(...incomes.map((item) => item.amount))}</p>
                  <p>${Math.max(...incomes.map((item) => item.amount))}</p>
                </div>
                <h2 className="salary-title">
                  Min <span>Expense</span>Max
                </h2>

                <div className="salary-item">
                  <p>${Math.min(...expenses.map((item) => item.amount))}</p>
                  <p>${Math.max(...expenses.map((item) => item.amount))}</p>
                </div>
              </div>
            </div>
          )}
          <div className="chart-con">
            <h1>All Transactions</h1>
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: flex;
    flex-direction: column;
    .chart-con {
      .amount-con {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .income,
        .expense,
        .balance {
          background: rgb(30, 30, 30);
          border: 2px solid rgba(79, 79, 79, 0.8);
          box-shadow: 0px 1px 15px rgba(175, 175, 175, 0.1);
          border-radius: 10px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-con {
      margin-bottom: 4rem;
      display: flex;
      justify-content: space-between;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        padding: 0rem 1rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: rgb(30, 30, 30);
        border: 2px solid rgba(79, 79, 79, 0.8);
        box-shadow: 0px 1px 15px rgba(175, 175, 175, 0.1);
        padding: 1rem;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
