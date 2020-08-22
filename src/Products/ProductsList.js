import React from 'react';

import ProductCard from './ProductCard';
import withLoader from '../HOC/withLoader';

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
        <h1>Products</h1>
        <button 
          onClick={() => this.toggleDiscounts()}
        >
          Show only discounts
        </button>
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
    );
  }
}

export default withLoader(ProductsList);

const styles = {
  item: {
    marginBottom: '25px'
  }
};