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
  justify-content: center;
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

