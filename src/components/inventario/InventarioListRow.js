import React from 'react';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui';
import {Link} from 'react-router-dom';

const InventarioListRow = ({ingreso}) => (
    <TableRow key={ingreso.key}>
        <TableRowColumn>
            <Link to={"/ingresos/"+ingreso.key}>
                {ingreso.key}
            </Link>
            </TableRowColumn>
        <TableRowColumn>$ {ingreso.cantidad}</TableRowColumn>
        <TableRowColumn>{ingreso.description}</TableRowColumn>
        <TableRowColumn> {ingreso.captureDate}</TableRowColumn>
          <TableRowColumn> {ingreso.subtipo}</TableRowColumn>
            <TableRowColumn> {ingreso.referencia}</TableRowColumn>
    </TableRow>
);

export default InventarioListRow;
