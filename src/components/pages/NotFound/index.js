import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../shared/Layout';

const NotFound = () => (
  <Layout>
    Oops, Nothing was Found
    {' '}
    <Link className='underline text-blue-500' to={'/'}>Go Home!</Link>
  </Layout>
);

export default NotFound;