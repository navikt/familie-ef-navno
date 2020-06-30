import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { client } from './utils/sanity';
import Card from './components/card';
import Overgangsstonad from './sider/overgangstodnad';
const BlockContent = require('@sanity/block-content-to-react');

function App() {
  const [test, setTest] = useState<any>({});

  useEffect(() => {
    client
      .fetch('*[_type == $type][1]', { type: 'avsnitt' })
      .then((res: any) => {
        setTest(res);
        console.log(res);
      })
  }, []);

  const BlockRenderer = (props: any) => {
    const { style = 'normal' } = props.node;

    if (/^h\d/.test(style)) {
      const level = style.replace(/[^\d]/g, '');
      return React.createElement(
        style,
        { className: `heading-${level}` },
        props.children
      );
    }

    if (style === 'blockquote') {
      return <blockquote>- {props.children}</blockquote>;
    }

    // Fall back to default handling
    return BlockContent.defaultSerializers.types.block(props);
  };

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
      <BlockContent
        className="typo-normal"
        blocks={test.avsnitt_innhold}
        serializers={{ types: { block: BlockRenderer } }}
      />
      <Overgangsstonad />
    </div>
  );
}

export default App;
