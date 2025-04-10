// src/components/Modal/styles.ts
import styled, { keyframes } from 'styled-components';

const show = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  max-width: 90%;
  animation: ${show} 0.2s ease-out;
`;

export const ModalTitle = styled.h3`
  padding-bottom: 1rem;
`;
