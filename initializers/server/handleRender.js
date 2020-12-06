import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';

import createStore from '../../src/redux/store';

import { Provider } from 'react-redux';
import { matchPath, StaticRouter, Switch, Route } from 'react-router';
import routes from 'routes';

import { renderFullPage } from './renderFullPage';

function loadData(store, path) {
  const promises = [];
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  routes.some(route => {
    // use `matchPath` here
    const match = matchPath(path, route);
    if (match) promises.push(route.loadData({ match, store }));
    return match;
  });

  return Promise.all(promises);
};

export async function handleRender(req, res) {
  const context = {};

  const store = createStore();

  await loadData(store, req.url);

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Switch>
          {routes.map(route => (
            <Route key={route.name} {...route} />
          ))}
        </Switch>
      </StaticRouter>
    </Provider>
  );

  return renderFullPage(res, html, JSON.stringify(store.getState()), Helmet.renderStatic());
}