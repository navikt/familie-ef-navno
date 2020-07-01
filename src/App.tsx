import React from 'react';
import './app.less';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import Barnetilsynstonad from './sider/barnetilsynsstonad/Barnetilsynsstonad';
import Tilpasningsboks from './components/Tilpasningsboks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Temameny from './components/Temameny';

function App() {
  const temaer = ['Kort om overgangsstønad','Hvem kan få?','Barnas alder',
                  'Arbeidssituasjonen din','Hvor lenge kan du få?','Hvor mye kan du få?',
                  'Når utbetales pengene?', 'Du må melde fra om endringer', 'Du kan miste retten til stønad', 
                  'Slik søker du', 'Hva sier loven?', 'klagerettigheter',]
    
   return (
    <div>
      <Router>
        <Switch>
          <Route path={'/overgangsstønad'}>
            <Overgangsstonad />
          </Route>
          <Route path={'/barnetilsynsstønad'}>
            <Barnetilsynstonad />
          </Route>
          <Route path={'/tilpasningsboks'}>
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
