import ReactDOM from "react-dom";
import { ReactNode } from "react";
import { Overlay, ModalContainer, ModalTitle } from "./styles";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Cadastrar Nova Visita</ModalTitle>
        {children}
      </ModalContainer>
    </Overlay>,
    document.getElementById("modal-root")!
  );
};
