import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
    TableRow,
    TableRowColumn,
    RaisedButton
} from 'material-ui';
import {Link} from 'react-router-dom';

const IngresoListRow = ({ingreso, muiTheme}) => {
    console.log(muiTheme);
    return(
        <TableRow key={ingreso.key}>
            <TableRowColumn>$ {ingreso.cantidad}</TableRowColumn>
            <TableRowColumn>{ingreso.description}</TableRowColumn>
            <TableRowColumn>
                <Link to={"/ingresos/" + ingreso.key}>
                    {/*{ingreso.key}*/}
                    <RaisedButton label="Detalle" labelStyle={{color:muiTheme.palette.primary1Color}}/>
                </Link>
            </TableRowColumn>
        </TableRow>
    );
};

export default muiThemeable()(IngresoListRow);