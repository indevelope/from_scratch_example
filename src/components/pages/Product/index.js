import React from 'react';

import Layout from '../../shared/Layout';
import ProductCard from '../../shared/cards/ProductCard';

import { useProduct } from '../../hooks/useProducts';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

const Product = ({ match: { params } }) => {
  const product = useProduct(params.id);

  return (
    <Layout>
      <Helmet>
        <title>{product ? `Cart App – ${product.Title}` : 'Loading...'}</title>
      </Helmet>
      <BackButton />
      {product ? 
        <ProductCard product={product} />
        : <div>Loading...</div>
      }
    </Layout>
  )
};

export default Product;

const BackButton = () => {
  const history = useHistory();

  const goBack = () => {
    if (history.action === 'PUSH')
      history.goBack();
    else
      history.push('/');
  };

  return (
    <button
      className='border border-blue-800 text-blue-800 px-3 py-2 text-xs'
      onClick={goBack}
    >
      Go back
    </button>
  );
};