import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
  padding: 1.25rem;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  max-width: 50rem;

  margin: 1.25rem auto;

  word-break: break-all;

  background-color: ${({ theme }) => theme.colors['gray-500']};

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