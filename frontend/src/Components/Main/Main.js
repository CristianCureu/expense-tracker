import { useState } from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import Expenses from "../Expenses/Expenses";
import Dashboard from "../Dashboard/Dashboard";
import Income from "../Income/Income";


const Main = () => {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard active={active} />;
      case 2:
        return <Dashboard active={active} />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard active={active} />;
    }
  };

  return (
    <MainLayout>
      <Navigation active={active} setActive={setActive} />
      <main>{displayData()}</main>
    </MainLayout>
  );
};
const MainLayout = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  gap: 2rem;
`;
export default Main;
