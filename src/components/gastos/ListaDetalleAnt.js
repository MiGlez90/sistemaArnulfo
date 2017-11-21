import React from 'react';
import {TextField} from 'material-ui';
import ShowTableDetail from "./ShowTableDetail";

const ListaDetalleAnt = ({field}) => {
    const ready = field !== undefined ;
    let keys;
    if ( ready ){
        keys = Object.keys(field);
    }

    return (
        <div>
            {ready &&
            <div>
                <TextField
                    floatingLabelText={keys[0]}
                    value={field.date}
                />
                <ShowTableDetail
                    field={ field }
                />
            </div>
            }
        </div>
    );
};

export default ListaDetalleAnt;