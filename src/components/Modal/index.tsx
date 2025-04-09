import ReactDOM from "react-dom";
import { ReactNode } from "react";
import { Overlay, ModalContainer, ModalTitle } from "./styles";

interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

export const Modal = ({ children, title, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalContainer>
    </Overlay>,
    document.getElementById("modal-root")!
  );
};
