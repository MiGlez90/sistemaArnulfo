import React from 'react';
import IngresoListRow from './IngresoListRow';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui';



const IngresoList = ({ingresos, deleteIngreso}) => (
   <div>

       <Table>
           <TableHeader>
               <TableRow>
                   <TableHeaderColumn>ID</TableHeaderColumn>
                   <TableHeaderColumn>Cantidad</TableHeaderColumn>
                   <TableHeaderColumn>Descripción</TableHeaderColumn>
               </TableRow>
           </TableHeader>
           <TableBody>
               {
                   ingresos.map( ingreso => {
                       return <IngresoListRow key={ingreso.key} ingreso={ingreso} />
                   })
               }
           </TableBody>
       </Table>

   </div>
);

export default IngresoList;
