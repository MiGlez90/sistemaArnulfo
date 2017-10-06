import React from 'react';
import {ListItem, List} from 'material-ui';

const ListaDetalle = (props) => {

    return (
        <div>
            <h1>{props.title}</h1>
            <List>
                {props.data.map((ingreso) => {
                    return <ListItem key={ingreso.label}>{ingreso.label} : {ingreso.value}</ListItem>
                })}
            </List>
        </div>
    );
};

export default ListaDetalle;