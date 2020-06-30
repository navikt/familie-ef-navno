import React, { useEffect, useState } from 'react';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import { client } from './utils/sanity';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
        
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
      <Helmet>
        <title>TODO: SETT TITTEL</title>
      </Helmet>

      <BlockContent
        className="typo-normal"
        blocks={test.avsnitt_innhold}
        serializers={{ types: { block: BlockRenderer } }}
      />
      <Router>
        <Switch>
          <Route path={'/overgangsstønad'}>
            <Overgangsstonad />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
