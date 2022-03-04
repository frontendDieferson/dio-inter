import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import Router from './routes';
import GlobalStyle from './styles/globalStyles';

import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
