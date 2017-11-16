import React from 'react';
import Table  from './TableFixter';


const ExpandedRow = ({fieldFormatted}) => {

};

const ShowTableDetail = ({field}) => {
    const columns = [
        { title: 'Descripcion', dataIndex: 'description'},
        { title: 'Fecha', dataIndex: 'fecha'}
    ];


    return (
        <div>
            <Table
                columns={columns}
                dataSource={field.items}
            />
        </div>
    );
};

export default ShowTableDetail;
