import React from 'react';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import Barnetilsynstonad from './sider/barnetilsynsstonad/Barnetilsynsstonad';
import Skolepengerstønad from './sider/skolepengerstønad/Skolepengerstonad';
import Tilleggsstonad from './sider/tilleggsstønad/Tilleggsstonad';
import Alenemedbarn from './sider/alenemedbarn/Alenemedbarn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landingsside from './sider/landingsside/Landingsside';

function App() {
    
   return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={'/overgangsstonad'}>
            <Overgangsstonad />
          </Route>
          <Route path={'/barnetilsyn'}>
            <Barnetilsynstonad />
          </Route>
          <Route path={'/skolepenger'}>
            <Skolepengerstønad />
          </Route>
          <Route path={'/tilleggsstonader'}>
            <Tilleggsstonad />
          </Route>
          <Route path={'/hva-naa'}>
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
