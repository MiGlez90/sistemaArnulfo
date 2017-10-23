import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import { Table, Icon, Popconfirm, message } from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import firebase from '../../firebase';


const columns = [
    {
        title: "Id",
        dataIndex: "key",
        key: "key",

    },
    {
    title: 'Tipo',
    dataIndex: 'tipo',
        onFilter: (value, record) => record.tipo === value,
    key: 'tipo',
    render: text => <a href="">{text}</a>,
        filters: [{
            text: 'Animales',
            value: 'animales',
        }, {
            text: 'Semilla',
            value: 'semilla',
        }, {
            text: 'Otro',
            value: 'otro'
        }],
},
    {
        title:"Subtipo",
        dataIndex:"subtipo",
        key:"subtipo",
        render: text => <a href="">{text}</a>,
        filters: [{
            text: 'Porcino',
            value: 'porcino',
        }, {
            text: 'Equino',
            value: 'equino',
        }, {
            text: 'Bobino',
            value: 'bobino'
        },
            {
                text: 'Maiz',
                value: 'maiz'
            },
            {
                text: 'Sorgo',
                value: 'sorgo'
            },
            {
                text: 'Avena',
                value: 'avena'
            }],
        onFilter: (value, record) => record.tipo === value
    },
    {
    title: 'Fecha de ingreso',
    dataIndex: 'fecha',
        sorter: (a, b) => a.fecha - b.fecha,
    key: 'fecha',
        render: fecha => <span>{moment(fecha).format('LL')}</span>
}, {
    title: 'Cantidad',
    dataIndex: 'cantidad',
        sorter: (a, b) => a.cantidad - b.cantidad,
    key: 'cantidad',
        render: cantidad => <span>$ {cantidad}</span>
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="!#">Action 一 {record.cantidad}</a>
      <span className="ant-divider" />
      <Popconfirm onConfirm={()=>borrarItem(record)} title="estas seguro？" okText="Si" cancelText="No">
    <a>Borrar</a>
  </Popconfirm>

      <span className="ant-divider" />
      <a href="!#" className="ant-dropdown-link">
        Mas acciones <Icon type="down" />
      </a>
    </span>
    ),
}];

const borrarItem = (r) => {
    console.log(r);
    let updates = {};
    updates['/caja/' + r.key] = null;
    firebase.database().ref().update(updates);
    message.warning("Se ha borrado el ingreso");

};

//let total = 0;
//const footer = () => 'Total: ' + total;
const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Lista de Ingresos';
const showHeader = true;
//const scroll = { y: 240 };
class ShowTable extends Component{

    state = {
        bordered: false,
        //loading: false,
        pagination: true,
        size: 'default',
        expandedRowRender,
        title,
        showHeader,
       // footer,
        rowSelection: {},
        scroll: undefined,
        total:0

    };

    componentWillMount(){

    }

    footer = () => {return "el foot"};



    render(){
        const {data, loading} = this.props;
        return(
            <div>
                <QueueAnim>
                    <Table
                        bordered={true}
                        style={{minWidth:'600px'}}
                        {...this.state}
                        loading={loading}
                        columns={columns}
                        dataSource={data}
                        expandedRowRender={record => <p>{record.description}</p>}
                        rowSelection={{onChange:(sr,srk)=>{
                            console.log("rows: ", sr);
                            console.log("keys: ", srk);
                            let total = 0;
                            for (let k in srk){
                                console.log(srk[k].cantidad);
                                total += parseInt(srk[k].cantidad,10);
                            }
                            this.setState({total});
                            //return total;
                        }}}
                        footer={()=>"Totales: "+this.state.total}
                    />
                </QueueAnim>



            </div>
        );
    }
}



export default ShowTable;