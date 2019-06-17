import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AsyncComponent from './AsyncComponent';
import Home from './Home/Home';

const defineRoute = (path, caption, Component) => ({path, caption, Component});

const routes = [
  defineRoute('/', 'Home', Home),
  defineRoute('/stream', 'Stream', AsyncComponent(() => import('./Stream/Stream'))),
  defineRoute('/about', 'About', AsyncComponent(() => import('./About/About')))
];

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {routes.map(({path, caption}) => 
              <li key={path}><Link to={path}>{caption}</Link></li>
            )}
          </ul>
        </nav>

        <hr />

        <div className="content">
          {routes.map(({path, Component}) => 
            <Route key={path} exact={path === '/'} path={path} component={Component} />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
