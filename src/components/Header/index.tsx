import { useState } from "react";
import { StyledButton } from "../Button/styles";
import { Container, Title } from "./styles";
import { Modal } from "../Modal";
import VisitForm from "../VisitForm";
import { useVisits } from "../../contexts/VisitsContext";

const Header = () => {
  const { visits, addVisit } = useVisits();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Container>
        <Title>Gerenciador de Visitas</Title>
        <StyledButton onClick={() => setIsModalOpen(!isModalOpen)}>
          + Nova Visita
        </StyledButton>
      </Container>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h4>Cadastrar Nova Visita</h4>
          <VisitForm
            onSubmit={(visit) => addVisit(visit)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default Header;