import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from './components/home/HomePage';
//import Ingresos from './components/table/TableContainer';
import Ingresos from './components/ingresos/IngresoContainer';
import Gastos from './components/gastos/GastoContainer';
import Caja from './components/caja/TableContainer';
import Resumen from './components/resumen/Resumen';
import ManageIngresoPage from './components/ingresos/ManageIngresoPage';
import LoginContainer from "./components/login/LoginContainer";
import SignUpContainer from "./components/signup/SignUpContainer";
import PrivateRouteConnect from "./PrivateRouteConnect";
import IngresoFormContainer from "./components/ingresos/IngresoFormContainer";
import GastosFormConnect from "./components/gastos/GastoFormConnect";





const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRouteConnect exact path="/ingresos" component={Ingresos} />
        <PrivateRouteConnect path="/ingresos/addIngreso" component={IngresoFormContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignUpContainer} />
        <PrivateRouteConnect exact path="/gastos" component={Gastos} />
        <PrivateRouteConnect path="/gastos/addGasto" component={GastosFormConnect} />
        <PrivateRouteConnect path="/caja" component={Caja} />.

        <PrivateRouteConnect path="/resumen" component={Resumen} />
        <PrivateRouteConnect path="/ingresos/:key" component={ManageIngresoPage} />
    </Switch>
);

export default Routes