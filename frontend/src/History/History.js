import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      {!history.length
        ? "No recent history"
        : history.map((item) => {
            const { _id, title, amount, type } = item;
            return (
              <div key={_id} className="history-item">
                <p
                  style={{
                    color: type === "expense" ? "red" : "var(--color-green)",
                  }}
                >
                  {title}
                </p>

                <p
                  style={{
                    color: type === "expense" ? "red" : "var(--color-green)",
                  }}
                >
                  {type === "expense"
                    ? `-${amount <= 0 ? 0 : amount}`
                    : `+${amount <= 0 ? 0 : amount}`}
                </p>
              </div>
            );
          })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  h2 {
    padding: 0 2rem;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30%;
  .history-item {
    background: rgb(30, 30, 30);
    border: 2px solid rgba(79, 79, 79, 0.8);
    box-shadow: 0px 1px 15px rgba(175, 175, 175, 0.1);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
