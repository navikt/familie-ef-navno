import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { logEvent } from "./amplitude";

function App() {

   return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/overgangsstonad" component={() => { 
              logEvent('besøk', {'redirect': 'overgangsstonad'})
              window.location.replace('https://www.nav.no/overgangsstonad-enslig'); 
              return null;
          }}/>
          <Route path="/barnetilsyn" component={() => { 
              logEvent('besøk', {'redirect': 'barnetilsyn'})
              window.location.replace('https://www.nav.no/barnetilsyn-enslig'); 
              return null;
          }}/>
          <Route path="/skolepenger" component={() => { 
              logEvent('besøk', {'redirect': 'skolepenger'})
              window.location.replace('https://www.nav.no/skolepenger-enslig'); 
              return null;
          }}/>
          <Route path="/tilleggsstonader" component={() => { 
              logEvent('besøk', {'redirect': 'tilleggsstonader'})
              window.location.replace('https://www.nav.no/tilleggsstonader-enslig'); 
              return null;
          }}/>
          <Route path="/hva-naa" component={() => { 
              logEvent('besøk', {'redirect': 'hva-naa'})
              window.location.replace('https://www.nav.no/alene-med-barn'); 
              return null;
          }}/>
          <Route exact path="/" component={() => { 
              logEvent('besøk', {'redirect': 'alene-med-barn'})
              window.location.replace('https://www.nav.no/alene-med-barn'); 
              return null;
          }}/>
        </Switch>
      </Router>
  );
}

export default App;
