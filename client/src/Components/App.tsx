import React from 'react';
import 'Components/App.scss';
import 'Components/Common/scss/_reset.scss';
import AppRouter from 'Components/Router';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
    <div className="App">
      <AppRouter />
    </div>
    </CookiesProvider>
  );
}

export default App;
