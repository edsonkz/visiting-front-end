// src/components/Modal/styles.ts
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  max-width: 90%;
`;
