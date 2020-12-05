import { connect } from 'react-redux';
import ProductsList from './ProductsList';

const mapStateToProps = state => ({
  products: state.products.entries,
  isLoading: state.products.isLoading
});

export default connect(mapStateToProps)(ProductsList);