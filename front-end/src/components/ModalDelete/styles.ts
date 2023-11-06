import styled from "styled-components";

export const ModalDeleteContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalDeleteWindow = styled.div`
  width: 30rem;
  height: 15rem;
  background: ${({ theme }) => theme.colors['gray-600']};
  border-radius: 0.625rem;
  padding: 1.25rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2``;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const ButtonDelete = styled.button`
  width: 10rem;
  height: 2.625rem;
  padding: 0.625rem;
  margin-top: 1rem;

  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.titleBold};

  cursor: pointer;

  border-radius: 5px;
  border: none;

  background-color: rgba(25, 195, 125, 0.7);
  color: ${({ theme }) => theme.colors['gray-100']};

  &:hover {
    background-color: rgba(25, 195, 125, 0.5);;
    transition: 0.2s;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors['gray-100']}; 
  }
`;

export const ButtonCancel = styled.button`
  width: 10rem;
  height: 2.625rem;
  padding: 0.625rem;
  margin-top: 1rem;

  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.titleBold};

  cursor: pointer;

  border-radius: 5px;
  border: none;

  background-color: ${({ theme }) => theme.colors['danger']};
  color: ${({ theme }) => theme.colors['gray-100']};

  &:hover {
    background-color: #a03636;
    transition: 0.2s;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors['gray-100']}; 
  }
`;