import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Product from './components/pages/Product';

import { productPath } from './helpers/routes';
import store from './redux/store';
import { fetchProducts } from './redux/slices/products.slice';

const history = createBrowserHistory();

history.listen((location, action) => {
  console.log(location, action);
});

const onLoad = () => {
  store.dispatch(fetchProducts());
}

class App extends React.Component {
  componentDidMount() {
    onLoad();
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route component={Main} path='/' exact />
            <Route component={Product} path={productPath()} strict exact />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;