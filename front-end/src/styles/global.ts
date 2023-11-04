import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  } 

  body {
    background: ${({ theme }) => theme.colors['gray-500']};
    color: ${({ theme }) => theme.colors['gray-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: ${({ theme }) => theme.fonts.regular};
  }

  button {
    cursor: pointer;
  }

  input::-webkit-outer-spin--button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;