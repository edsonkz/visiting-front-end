import { useState } from "react";
import { Visit } from "../../types/visit";
import { calculateVisitDuration } from "../../utils/calculateVisitDuration";
import { Button } from "../Button";
import { RowDiv, StyledVisitCard } from "../DateCard/styles";
import { Modal } from "../Modal";
import { VisitForm } from "../VisitForm";
import { useVisits } from "../../contexts/VisitsContext";
import { toast } from "react-toastify";
import { Tag } from "./styles";

interface VisitCardProps {
  visit: Visit;
}

export const VisitCard = ({ visit }: VisitCardProps) => {
  const { address, ...visitWithoutAdress } = visit;
  const { updateVisit, changeStatus } = useVisits();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVisitSubmit = (visit: Visit) => {
    const response = updateVisit(visit);

    toast(response.message, { type: response.success ? "success" : "error" });
  };

  return (
    <StyledVisitCard>
      <Tag>Nº {visit.id}</Tag>
      <div>
        <div>Formulários: {visit.forms}</div>
        <div>Produtos: {visit.products}</div>
        <div>Duração Estimada: {calculateVisitDuration(visit)} minutos</div>
      </div>

      <div>
        <h4>Endereço</h4>
        <div>
          {address.street}, {address.number} - {address.cep}
        </div>
        <div>
          {address.neighborhood}, {address.city} - {address.uf}
        </div>
      </div>

      <RowDiv marginbottom="0">
        <Button onClick={() => setIsModalOpen(true)}>Editar</Button>
        <Button
          variant={visit.status === "done" ? "danger" : "success"}
          onClick={() => changeStatus(visit.id, visit.date)}
        >
          {visit.status === "done" ? "Desfazer Visita" : "Completar Visita"}
        </Button>
      </RowDiv>

      {isModalOpen && (
        <Modal title="Editar Visita" onClose={() => setIsModalOpen(false)}>
          <VisitForm
            defaultValues={{ ...address, ...visitWithoutAdress }}
            onSubmit={handleVisitSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </StyledVisitCard>
  );
};
