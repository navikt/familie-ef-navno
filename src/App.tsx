import React from 'react';
import './app.less';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import Barnetilsynstonad from './sider/barnetilsynsstonad/Barnetilsynsstonad';
import Skolepengerstønad from './sider/skolepengerstønad/Skolepengerstonad';
import Tilleggsstonad from './sider/tilleggsstønad/Tilleggsstonad';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
