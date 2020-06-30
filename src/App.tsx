import React, {useEffect, useState} from 'react';
import  Knapp  from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { client, hentAvsnittQuery } from './utils/sanity';
import './app.less';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Venter på respons fra Sanity.</p>
        <Knapp>Normal</Knapp>
        <Panel border>
          Et helt vanlig panel med tekstinnhold.
        </Panel>
      </header>
    </div>
  );
}

export default App;
