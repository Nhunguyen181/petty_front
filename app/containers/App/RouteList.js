import React from 'react';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OrderProductsContainer from '../OrderProductsContainer';
import ProductDetailContainer from '../ProductDetailContainer';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import AuthContext from '../../utils/auth';

const routes = [
  {
    path: '/',
    exact: true,
    private: true,
    main: () => <HomePage />,
  },

  {
    path: '/order',
    exact: true,
    private: true,
    main: () => <OrderProductsContainer />,
  },
  {
    path: '/order/:id',
    exact: true,
    private: true,
    main: () => <OrderProductsContainer />,
  },
  {
    path: '/product',
    exact: true,
    private: true,
    main: () => <ProductDetailContainer />,
  },
  {
    path: '/login',
    exact: true,
    private: false,
    main: () => <LoginPage />,
  },
  {
    path: '',
    exact: false,
    private: false,
    main: () => <NotFoundPage />,
  },
];
const PrivateRoute = ({ path, exact, component, isSignedIn }) => {
  return (
    <Route path={path} exact={exact} render={component}>
      {!isSignedIn ? <Redirect to={{ pathname: '/login' }} /> : ''}
    </Route>
  );
};

class RouteList extends React.Component {
  showContentRoute = () => {
    const isAuthenticated = this.context;
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        if (route.private) {
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
              isSignedIn={isAuthenticated}
            />
          );
        }
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={route.main}
          />
        );
      });
    }
    return result;
  };
  render() {
    return <Switch>{this.showContentRoute()}</Switch>;
  }
}
RouteList.contextType = AuthContext;
export default RouteList;
