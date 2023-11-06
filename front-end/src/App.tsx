import { Home } from "./components/Home";
import { SettingsContextProvider } from "./components/context/SettingsContext";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <SettingsContextProvider>
        <Home />
      </SettingsContextProvider>
    </ThemeProvider>
  )  
}

export default App
