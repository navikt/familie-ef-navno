import React from 'react';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import Barnetilsynstonad from './sider/barnetilsynsstonad/Barnetilsynsstonad';
import Skolepengerstønad from './sider/skolepengerstønad/Skolepengerstonad';
import Tilleggsstonad from './sider/tilleggsstønad/Tilleggsstonad';
import Alenemedbarn from './sider/alenemedbarn/Alenemedbarn';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Landingsside from './sider/landingsside/Landingsside';

function App() {
    
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
          <Route path={'/skolepengerstønad'}>
            <Skolepengerstønad />
          </Route>
          <Route path={'/tilleggsstønad'}>
            <Tilleggsstonad />
          </Route>
          <Route path={'/alenemedbarn'}>
            <Alenemedbarn />
          </Route>
          <Route path={'/'}>
            <Landingsside />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
