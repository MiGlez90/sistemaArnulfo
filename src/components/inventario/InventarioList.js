import React from 'react';
import InventarioListRow from './InventarioListRow';
import Select from './Select';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui';



const InventarioList = ({ingresos, deleteIngreso}) => (
   <div>
       <h2>Inventario</h2>

       <br/>

       <Select/>

       <br/>

       <Table>
           <TableHeader>
               <TableRow>
                   <TableHeaderColumn>ID</TableHeaderColumn>
                   <TableHeaderColumn>Cantidad</TableHeaderColumn>
                   <TableHeaderColumn>Descripción</TableHeaderColumn>
                  <TableHeaderColumn>Fecha</TableHeaderColumn>
                    <TableHeaderColumn>Subtipo</TableHeaderColumn>
                  <TableHeaderColumn>Referencia</TableHeaderColumn>
               </TableRow>
           </TableHeader>
           <TableBody>
               {
                   ingresos.map( ingreso => {
                       return <InventarioListRow key={ingreso.key} ingreso={ingreso} />
                   })
               }
           </TableBody>
       </Table>

   </div>
);

export default InventarioList;
