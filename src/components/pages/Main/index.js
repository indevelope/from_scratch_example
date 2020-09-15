import React from 'react';
import Layout from '../../shared/Layout';
import Cart from './Cart';

import { Helmet } from 'react-helmet';

const Main = () => (
  <Layout>
    <Helmet>
      <title>Cart App</title>
    </Helmet>
    <Cart />
  </Layout>
);

export default Main;