import React from 'react';
import DiscountModal from './DiscountModal';

import './index.css';

class ProductCard extends React.Component {
  render() {
    if (!this.props.product)
      return <div>Empty product</div>;

    const { 
      product,
      addToCart
    } = this.props;

    return (
      <Card>
        <Cover src={product.Cover} alt={product.Title} />
        <CardBody>
          <Title>{product.Title}</Title>
          <Description>{product.Description}</Description>
          <Price value={product.Price} discount={product.Discount} />
          <DiscountModal />
          <AddToCartButton onClick={() => addToCart(this.props.product)} />
        </CardBody>
      </Card>
    )
  }
}

export default ProductCard;

const Description = ({ children }) => (
  <div>{children}</div>
);

const AddToCartButton = ({ onClick }) => (
  <button onClick={onClick}>Add to Cart</button>
);

const Card = ({ children }) => (
  <div className='card'>
    {children}
  </div>
);

const Cover = ({ src, alt }) => (
  <div className='imageBox'>
    <img className='image' src={src} alt={alt} />
  </div>
);

const CardBody = ({ children }) => (
  <div className='cardBody'>
    {children}
  </div>
);

const Title = ({ children }) => (
  <div className='title'>{children}</div>
);

const Price = ({ value, discount }) => (
  <div className='price'>
    {
      discount ?
        <><s>${value}</s> ${Math.floor(value * 0.95)}</>
        : <>${value}</>
    }
  </div>
);