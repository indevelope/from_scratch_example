import React from 'react';

import { Router, Route, Switch, matchPath } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routes from 'routes';

import { Provider } from 'react-redux';
import createStore from './redux/store';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(preloadedState);
const history = createBrowserHistory();

history.listen((location, action) => {
  onLoad();
});

const onLoad = () => {
  const promises = [];
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  routes.some(route => {
    // use `matchPath` here
    const match = matchPath(history.location.pathname, route);
    if (match) promises.push(route.loadData({ match, store }));
    return match;
  });

  return Promise.all(promises);
};

class App extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'production')
      onLoad();
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {routes.map(route => (
              <Route key={route.name} {...route} />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;