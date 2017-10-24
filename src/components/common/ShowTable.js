import React from 'react';
import TableRowComponent from './TableRowComponent';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui';

const noData = (
    <TableRow selectable={false} >
        <TableRowColumn/>
        <TableRowColumn>No hay datos</TableRowColumn>
        <TableRowColumn/>
    </TableRow>
);

const ShowTable = ({data}) => {
    let showData = noData;
    if(data.length > 0){
        showData = data.map(fact => {
            return <TableRowComponent key={fact.key} fact={fact}/>
        });
    }
    return (
        <div>
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Fecha</TableHeaderColumn>
                        <TableHeaderColumn>Total</TableHeaderColumn>
                        <TableHeaderColumn>Acciones</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {showData}
                </TableBody>
            </Table>

        </div>
    );
};

ShowTable.defaultProps = {
    data: []
};

export default ShowTable;
