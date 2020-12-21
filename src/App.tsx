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
    <div className="navno-side">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/overgangsstonad" component={Overgangsstonad}/>
          <Route path="/barnetilsyn" component={Barnetilsynstonad}/>
          <Route path="/skolepenger" component={Skolepengerstønad}/>
          <Route path="/tilleggsstonader" component={Tilleggsstonad}/>
          <Route path="/hva-naa" component={Alenemedbarn}/>
          <Route path="/" component={Landingsside}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
