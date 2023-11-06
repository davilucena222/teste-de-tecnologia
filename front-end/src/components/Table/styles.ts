import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
  padding: 1.25rem;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  max-width: 70rem;

  margin: 1.25rem auto;

  word-break: break-all;

  background: ${({ theme }) => theme.colors['gray-500']};

`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: center;
  border-top: inset;
  border-bottom: inset;
  border-left: inset;
  border-right: inset;
  border-radius: 5px;
  padding-bottom: 0.313rem;
  height: 2.5rem;
`;

export const Td = styled.td`
  border-bottom: inset;
  border-left: inset;
  border-right: inset;
  border-radius: 5px;
  padding: 0.5rem;
  text-align: ${(props) => (props.align === "center" ? "center" : "start")};

  width: ${(props) => (props.width ? props.width : "start")};

  svg {
    cursor: pointer;
  }
`;

export const ButtonDate = styled.button`
  width: 2rem;
  margin-left: 0.5rem;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  background: ${({ theme }) => theme.colors['gray-100']};
  border: 1px solid ${({ theme }) => theme.colors['gray-700']};

  &:hover {
    background: #c0c0c0; 
    transition: 0.2s;
  }
`;