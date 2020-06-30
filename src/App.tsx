import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './app.less';
import Card from './components/card';
import Overgangsstonad from './sider/overgangstodnad';
import  Knapp  from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { client, hentAvsnittQuery } from './utils/sanity';
        
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
        <p>Venter på respons fra Sanity.</p>
        <Knapp>Normal</Knapp>
        <Panel border>
          Et helt vanlig panel med tekstinnhold.
        </Panel>
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
