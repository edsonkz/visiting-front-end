import Header from "../../components/Header";
import { Container, Content } from "./styles";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default DefaultLayout;
