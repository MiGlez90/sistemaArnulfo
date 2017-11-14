import Ract from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';


const titleStyle = {
    display: 'inline'
};

function FirstLetterInMayus(string){
    string.toLowerCase();
    return  string.charArt(0).toUpperCase() + string.slice(1);

}

const ListaDetalle = (props) => {

    return (
        <div>
            <h2 style={titleSyle}>{props.title}</h2>
            <Table selectable={false}>
                <TableHeader displaySelectAll={false}>
                     <TableHeaderColumn>Nombre</TableHeaderColumn>
                     <TableHeaderColumn>Descripción</TableHeaderColumn>
                </TableHeader>

                <TableBody displayRowCheckbox={false}>
                    {
                        props.data.map( gasto => {
                        if(gasto.label === 'key'){
                            return null;
                        }

                        const label =FirstLetterInMayus(gasto.label);
                        return (
                            <TableRow key={gasto.label}>
                                <TableRowColumn>{label}</TableRowColumn>
                                <TableRowColumn>{gasto.value}</TableRowColumn>
                            </TableRow>
                        )

                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ListaDetalle;