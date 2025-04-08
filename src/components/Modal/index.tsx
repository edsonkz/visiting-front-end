import ReactDOM from "react-dom";
import { ReactNode } from "react";
import { Overlay, ModalContainer } from "./styles";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>,
    document.getElementById("modal-root")!
  );
};
