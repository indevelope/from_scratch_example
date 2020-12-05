import React from 'react';
import { Link } from 'react-router-dom';
import DiscountModal from './DiscountModal';
import { productPath } from '../../../../helpers/routes';

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
        {product.Cover && <Cover src={product.Cover} alt={product.Title} />}
        <CardBody>
          <Title><Link to={productPath(product.Id)}>{product.Title}</Link></Title>
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
  <button className='bg-blue-600 hover:bg-blue-800 rounded text-white py-3' onClick={onClick}>Add to Cart</button>
);

const Card = ({ children }) => (
  <div className='flex flex-col md:flex-row'>
    {children}
  </div>
);

const Cover = ({ src, alt }) => (
  <div className='w-full flex justify-center md:flex-none md:w-48 md:flex-col'>
    <img className='w-1/2 md:w-full' src={src} alt={alt} />
  </div>
);

const CardBody = ({ children }) => (
  <div className='flex-grow flex flex-col justify-evenly px-3 py-5'>
    {children}
  </div>
);

const Title = ({ children }) => (
  <div className='font-bold text-xl'>{children}</div>
);

const Price = ({ value, discount }) => (
  <div className='font-bold text-lg tracking-wider'>
    {
      discount ?
        <><s>${value}</s> ${Math.floor(value * 0.95)}</>
        : <>${value}</>
    }
  </div>
);