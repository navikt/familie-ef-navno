import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

   return (
    <div className="navno-side">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/overgangsstonad" component={() => { 
              window.location.replace('https://www.nav.no/overgangsstonad-enslig'); 
              return null;
          }}/>
          <Route path="/barnetilsyn" component={() => { 
              window.location.replace('https://www.nav.no/barnetilsyn-enslig'); 
              return null;
          }}/>
          <Route path="/skolepenger" component={() => { 
              window.location.replace('https://www.nav.no/skolepenger-enslig'); 
              return null;
          }}/>
          <Route path="/tilleggsstonader" component={() => { 
              window.location.replace('https://www.nav.no/tilleggsstonader-enslig'); 
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
