import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Detail from './Detail';

require('dotenv').config()

function NotFound(){
  return(
    <h3> Page Not Found 404</h3>
  )
}

ReactDOM.render(
  <Router>
      <main>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/detail/:id" component={Detail}/>
          <Route component={NotFound}/>
        </Switch>
      </main>
    </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
