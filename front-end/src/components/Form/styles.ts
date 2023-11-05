import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;

  width: 40rem;
  gap: 0.725rem;
  padding: 1.25rem;

  background-color: ${({ theme }) => theme.colors['gray-600']};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
`;

export const Overlay = styled.div`
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

export const InputArea = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.8rem;
  padding: 0 0.625rem;
  margin-bottom: 0.5rem;

  font-size: 1rem;

  background-color: ${({ theme }) => theme.colors['gray-500']};
  color: ${({ theme }) => theme.colors['gray-100']};

  border: 1px solid ${({ theme }) => theme.colors['gray-700']};
  border-radius: 10px;

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors['gray-100']};
  }
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  width: 35rem;
`;

export const Button = styled.button`
  width: 20rem;
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

export const ButtonClose = styled.button`
  width: 20rem;
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