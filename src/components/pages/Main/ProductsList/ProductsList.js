import React from 'react';

import ProductCard from 'components/shared/cards/ProductCard';
import withLoader from 'components/HOC/withLoader';

class ProductsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { onlyDiscounts: false };
  }

  toggleDiscounts() {
    this.setState({ onlyDiscounts: !this.state.onlyDiscounts });
  }

  render() {
    const { addToCart } = this.props;
    const { onlyDiscounts } = this.state;
    return (
      <div>
        <h1 className='font-bold text-2xl mt-10'>Products</h1>
        <button
          className='px-3 py-1 border border-blue-700 bg-white text-blue-700 rounded text-xs'
          onClick={() => this.toggleDiscounts()}
        >
          Show only discounts
        </button>
        <div className='mt-10'>
          {
            this.props.products
              .filter(p => p.Discount || !onlyDiscounts)
              .map((product) => (
                <div key={product.Id} style={styles.item}>
                  <ProductCard addToCart={addToCart} product={product} />
                </div>
              ))
          }
        </div>
      </div>
    );
  }
}

export default withLoader(ProductsList);

const styles = {
  item: {
    marginBottom: '25px'
  }
};