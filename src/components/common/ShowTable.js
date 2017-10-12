import React from 'react';
import TableRowComponent from './TableRowComponent';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui';



const ShowTable = ({data}) => (
   <div>

       <Table>
           <TableHeader displaySelectAll={false}>
               <TableRow>
                   <TableHeaderColumn>Cantidad</TableHeaderColumn>
                   <TableHeaderColumn>Descripción</TableHeaderColumn>
                   <TableHeaderColumn>Acciones</TableHeaderColumn>
               </TableRow>
           </TableHeader>
           <TableBody>
               {
                   data.map( fact => {
                       return <TableRowComponent key={fact.key} fact={fact} />
                   })
               }
           </TableBody>
       </Table>

   </div>
);

export default ShowTable;
