import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import ListaEmpresa from './pages/Empresa/Lista';
import EmpresaForm from './pages/Empresa/Form';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <PrivateRoute path="/app" component={ListaEmpresa} />
      <PrivateRoute path="/empresa-cadastro" component={EmpresaForm} />
      <PrivateRoute path="/empresa-alterar/:id" component={EmpresaForm} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
