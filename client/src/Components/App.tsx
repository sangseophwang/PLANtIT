import 'Components/App.scss';
import 'Components/Common/scss/_reset.scss';
import AppRouter from 'Components/Router';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <HelmetProvider>
        <div className="App">
          <AppRouter />
        </div>
      </HelmetProvider>
    </CookiesProvider>
  );
}

export default App;
