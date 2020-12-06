import Main from "../components/pages/Main";
import NotFound from "../components/pages/NotFound";
import Product from "../components/pages/Product";
import { productPath } from "../helpers/routes";
import { fetchProducts } from "../redux/slices/products.slice";

export default [
  {
    name: 'main',
    path: '/',
    strict: true,
    exact: true,
    component: Main,
    loadData: ({ store }) => {
      return store.dispatch(fetchProducts());
    }
  },
  {
    name: 'product',
    path: productPath(),
    strict: true,
    exact: true,
    component: Product,
    loadData: ({ store }) => {
      return store.dispatch(fetchProducts());
    }
  },
  {
    name: 'notFount',
    component: NotFound
  }
];