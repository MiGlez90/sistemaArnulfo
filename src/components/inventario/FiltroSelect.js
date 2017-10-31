import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const FiltroSelect  = (props) => {
        const {filtro, onChange, tipos} = props;
        return (
            <div>
                <SelectField
                    floatingLabelText="Filtrar por tipo"
                    value={filtro}
                    onChange={onChange}
                    fullWidth={true}
                >
                    <MenuItem key="todos" value="todos" primaryText="Todos"  />
                    {tipos}
                </SelectField>
            </div>
        );
};

export default FiltroSelect;
