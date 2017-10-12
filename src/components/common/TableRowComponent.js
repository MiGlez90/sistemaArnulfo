import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
    TableRow,
    TableRowColumn,
    RaisedButton
} from 'material-ui';
import {Link} from 'react-router-dom';

const TableRowComponent = ({fact, muiTheme}) => {
    console.log(muiTheme);
    return(
        <TableRow key={fact.key}>
            <TableRowColumn>$ {fact.cantidad}</TableRowColumn>
            <TableRowColumn>{fact.description}</TableRowColumn>
            <TableRowColumn>
                <Link to={"/ingresos/" + fact.key}>
                    {/*{fact.key}*/}
                    <RaisedButton
                        label="Detalle"
                        labelStyle={{color:muiTheme.palette.primary1Color}}
                    />
                </Link>
            </TableRowColumn>
        </TableRow>
    );
};

export default muiThemeable()(TableRowComponent);