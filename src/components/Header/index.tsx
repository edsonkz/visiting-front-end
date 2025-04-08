import { useState } from "react";
import { StyledButton } from "../Button/styles";
import { Container, Title } from "./styles";
import { Modal } from "../Modal";
import VisitForm from "../VisitForm";
import { useVisits } from "../../contexts/VisitsContext";
import { Visit } from "../../types/visit";
import { toast } from "react-toastify";

const Header = () => {
  const { addVisit } = useVisits();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVisitSubmit = (visit: Visit) => {
    const response = addVisit(visit);

    toast(response.message, { type: response.success? "success" : "error" });
  }

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
          <VisitForm
            onSubmit={handleVisitSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default Header;