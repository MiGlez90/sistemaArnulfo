import React from 'react';
import SelectedField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const FiltroSelect = (props) => {
    const {filtro, onChange, tipos} = props;
    return (
        <div>
            <SelectedField
                floatingLabelText="Filtrar por tipo"
                value={filtro}
                onChange={onChange}
                fullWidth={true}
            >
                <MenuItem key="todos" value="todos" primaryText="Todos"/>
            </SelectedField>
        </div>
    );
};

export default FiltroSelect;