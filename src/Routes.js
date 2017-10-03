import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from './components/home/HomePage';
//import Ingresos from './components/table/TableContainer';
import Ingresos from './components/ingresos/IngresoContainer';
import Gastos from './components/tableGastos/TableContainer';
import Caja from './components/caja/TableContainer';
import Resumen from './components/resumen/Resumen';
import ManageIngresoPage from './components/ingresos/ManageIngresoPage';





const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/ingresos" component={Ingresos} />
        <Route path="/gastos" component={Gastos} />
        <Route path="/caja" component={Caja} />
        <Route path="/resumen" component={Resumen} />
            <Route path="/ingresos/:key" component={ManageIngresoPage} />
    </Switch>
);

export default Routes