import  Home  from '../containers/Home';
import NotFoundComponent from '../components/views/notFound/NotFoundComponent';
import Search from '../containers/Search';
import ProductComponent from '../components/views/product/ProductComponent';

const routes = [
  { path: '/' , exact: true,name: 'Home', component: Home },
  { path: '/home' , exact: true,name: 'Home', component: Home },
  { path: '/search' , exact: true,name: 'search ', component:  Search},
  { path: '/product' , exact: true,name: 'product ', component:  ProductComponent},
  { path: '/*' ,name: 'not found', component: NotFoundComponent },
];

export default routes;
