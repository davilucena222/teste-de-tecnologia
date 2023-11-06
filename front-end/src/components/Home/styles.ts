import styled from "styled-components";

export const Box = styled.main`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  height: 5rem;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2``;

export const Separator = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors['gray-400']};
`;

export const Container = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

export const ButtonProp = styled.button`
  width: 10rem;
  height: 3rem;
  font-size: 1rem;

  border-radius: 5px;

  cursor: pointer;

  background: rgb(25, 195, 125);
  color: ${({ theme }) => theme.colors['gray-100']};

  &:hover {
    background-color: rgba(25, 195, 125, 0.8); 
    transition: 0.2s;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors['gray-100']};
  }
`;

export const Description = styled.h3`
  margin-top: 14rem;
`;