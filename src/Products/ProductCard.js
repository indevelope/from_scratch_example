import React from 'react';
import DiscountModal from './DiscountModal';

class ProductCard extends React.Component {
  render() {
    if (!this.props.product)
      return <div>Empty product</div>;

    const { 
      product: { Title, Price, Cover, Description, Discount },
      addToCart
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.imageBox}>
          <img style={styles.image} src={Cover} alt={Title} />
        </div>
        <div style={styles.cardBody}>
          <div style={styles.title}>{Title}</div>
          <div>{Description}</div>
          <div style={styles.price}>
            {
              Discount ?
                <><s>${Price}</s> ${Math.floor(Price * 0.95)}</>
                : <>${Price}</>
            }
          </div>
          <DiscountModal />
          <button onClick={() => addToCart(this.props.product)}>Add to Cart</button>
        </div>
      </div>
    )
  }
}

export default ProductCard;

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'sans-serif',
  },
  imageBox: {
    maxWidth: '200px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  cardBody: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '15px 10px'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  price: {
    fontWeight: 'bold',
    fontSize: '1.05rem',
    letterSpacing: '.05rem'
  }
};