import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from './components/home/HomePage';
//import Ingresos from './components/table/TableContainer';
import Ingresos from './components/ingresos/IngresoContainer';
import Gastos from './components/tableGastos/TableContainer';
import Caja from './components/caja/TableContainer';
import Resumen from './components/resumen/Resumen';
import ManageIngresoPage from './components/ingresos/ManageIngresoPage';
import LoginContainer from "./components/login/LoginContainer";
import SignUpContainer from "./components/signup/SignUpContainer";
import PrivateRoute from "./PrivateRoute";





const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/ingresos" component={Ingresos} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignUpContainer} />
        <PrivateRoute path="/gastos" component={Gastos} />
        <PrivateRoute path="/caja" component={Caja} />
        <PrivateRoute path="/resumen" component={Resumen} />
        <PrivateRoute path="/ingresos/:key" component={ManageIngresoPage} />
    </Switch>
);

export default Routes