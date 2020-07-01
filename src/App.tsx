import React, { useEffect, useState } from 'react';
import './app.less';
import { client } from './utils/sanity';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import Tilpasningsboks from './components/Tilpasningsboks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Temameny from './components/Temameny';
        
const BlockContent = require('@sanity/block-content-to-react');

function App() {
  const [test, setTest] = useState<any>({});
  const temaer = ['Kort om overgangsstønad','Hvem kan få?','Barnas alder',
                  'Arbeidssituasjonen din','Hvor lenge kan du få?','Hvor mye kan du få?',
                  'Når utbetales pengene?', 'Du må melde fra om endringer', 'Du kan miste retten til stønad', 
                  'Slik søker du', 'Hva sier loven?', 'klagerettigheter',]

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
          <Route path={'/temameny'}>
            <Temameny temaer={temaer}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
