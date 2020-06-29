import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { client } from './utils/sanity';

function App() {
  const [test, setTest] = useState<any>({});

  useEffect(() => {
    client
    .fetch('*[_type == $type][0]', {type: 'avsnitt'})
    .then((res:any) => {
      setTest(res);
      console.log(res);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>HELLO WORLD!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
