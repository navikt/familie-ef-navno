import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './app.less';
import Card from './components/card';
import  Knapp  from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { client, hentAvsnittQuery } from './utils/sanity';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import Tilpasningsboks from './components/Tilpasningsboks';
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
    <div>
      <Helmet>
        <title>TODO: SETT TITTEL</title>
      </Helmet>

      <Router>
        <Switch>
          <Route path={'/overgangsstønad'}>
            <Overgangsstonad />
          </Route>
          <Route path={'/komponent'}>
            <Tilpasningsboks></Tilpasningsboks>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
