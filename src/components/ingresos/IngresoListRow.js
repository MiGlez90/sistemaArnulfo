import React from 'react';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Link} from 'react-router-dom';

const IngresoListRow = ({ingreso}) => (
    <TableRow>
        <TableRowColumn>
            <Link to={"/ingresos/"+ingreso.key}>
                {ingreso.key}
            </Link>

            </TableRowColumn>
        <TableRowColumn>$ {ingreso.cantidad}</TableRowColumn>
        <TableRowColumn>{ingreso.description}</TableRowColumn>
    </TableRow>
);

export default IngresoListRow;