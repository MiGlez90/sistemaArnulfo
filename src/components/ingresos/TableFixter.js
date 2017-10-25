import React from 'react';
import {TableRow, Table, TableBody, TableHeaderColumn, TableHeader, TableRowColumn} from 'material-ui';

const TableRowColumnFixter = ({rowcolumndata, ...otherProps}) => {
    let rowcolumnsTemp = rowcolumndata;
    if ( rowcolumndata instanceof Object){
        rowcolumnsTemp = [];
        for( let index in rowcolumndata){
            rowcolumnsTemp.push(rowcolumndata[index]);
        }
    }
    const rowcolumns = rowcolumnsTemp.map( rcf => {
        return <TableRowColumn>{rcf}</TableRowColumn>
    });

    return (
        <TableRow {...otherProps}>
            {otherProps.children[0]}
            {rowcolumns}
        </TableRow>
    )
};

// function getAllIndexes(columns) {
//     let dataIndexes = "";
//     for( let column of columns){
//         dataIndexes += column['dataIndex'] + ',';
//     }
//     return dataIndexes.slice(0,dataIndexes.length - 1);
// }

function getAllIndexes(columns) {
    let dataIndexes = [];
    for( let column of columns){
        dataIndexes.push(column['dataIndex']) ;
    }
    return dataIndexes;
}

function getOnlyFieldsSelected(dataSource,dataIndexes) {
    let rowcolumndata = [];
    for ( let dS of dataSource){
        let obj = {};
        for ( let dI of dataIndexes){
            obj[dI] = dS[dI];
        }
        rowcolumndata.push(obj);
    }
    return rowcolumndata;
}

const TableFixter = ({columns, dataSource}) => {
    const header =  columns.map( column => {
        return <TableHeaderColumn>{column.title}</TableHeaderColumn>
    });
    const dataIndexes = getAllIndexes(columns);
    console.log(dataIndexes);

    const rowcolumndata = getOnlyFieldsSelected(dataSource,dataIndexes);
    console.log(rowcolumndata);

    const rowcolumns = rowcolumndata.map( row => {
        return <TableRowColumnFixter rowcolumndata={row}/>
    });

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {header}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rowcolumns}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableFixter;