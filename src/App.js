import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Product from './components/pages/Product';

import { productPath } from './helpers/routes';

const history = createBrowserHistory();

history.listen((location, action) => {
  console.log(location, action);
});

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route component={Main} path='/' exact />
          <Route component={Product} path={productPath()} strict exact />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;