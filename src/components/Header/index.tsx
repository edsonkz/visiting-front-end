import { StyledButton } from "../Button/styles";
import { Container, Title } from "./styles";

const Header = () => {
  return (
    <Container>
      <Title>Gerenciador de Visitas</Title>
      <StyledButton>+ Nova Visita</StyledButton>
    </Container>
  );
};

export default Header;
