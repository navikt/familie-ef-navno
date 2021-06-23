import React from 'react';
import Overgangsstonad from './sider/overgangsstonad/Overgangsstonad';
import Barnetilsynstonad from './sider/barnetilsynsstonad/Barnetilsynsstonad';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

   return (
    <div className="navno-side">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/overgangsstonad" component={Overgangsstonad}/>
          <Route path="/barnetilsyn" component={Barnetilsynstonad}/>
          <Route path="/skolepenger" component={() => { 
              window.location.replace('https://www.nav.no/familie/alene-med-barn/skolepenger'); 
              return null;
          }}/>
          <Route path="/tilleggsstonader" component={() => { 
              window.location.replace('https://www.nav.no/familie/alene-med-barn/tilleggsstonader'); 
              return null;
          }}/>
          <Route path="/hva-naa" component={() => { 
              window.location.replace('https://www.nav.no/alene-med-barn'); 
              return null;
          }}/>
          <Route exact path="/" component={() => { 
              window.location.replace('https://www.nav.no/alene-med-barn'); 
              return null;
          }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
