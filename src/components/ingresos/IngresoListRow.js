import React from 'react';
import {
    TableRow,
    TableRowColumn,
    RaisedButton
} from 'material-ui';
import {Link} from 'react-router-dom';

const IngresoListRow = ({ingreso}) => (
    <TableRow key={ingreso.key}>
        <TableRowColumn>$ {ingreso.cantidad}</TableRowColumn>
        <TableRowColumn>{ingreso.description}</TableRowColumn>
        <TableRowColumn>
            <Link to={"/ingresos/"+ingreso.key}>
                {/*{ingreso.key}*/}
                <RaisedButton label="Detalle"/>
            </Link>
        </TableRowColumn>
    </TableRow>
);

export default IngresoListRow;