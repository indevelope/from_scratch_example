import { connect } from 'react-redux';
import Product from './Product';

const mapStateToProps = (state, ownProps) => ({
  product: state.products.entries.find(p => p.Id === ownProps.match.params.id)
});

export default connect(mapStateToProps)(Product);