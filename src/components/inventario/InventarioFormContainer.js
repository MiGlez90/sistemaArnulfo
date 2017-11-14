import React, {Component} from 'react';
import {MenuItem, SelectField} from "material-ui";
import CommonFieldForm from './CommonFieldsForm';
import InventarioList from './InventarioList';
import {FloatingActionButton, Dialog, FlatButton} from 'material-ui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as inventarioActions from '../../actions/inventarioActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import toastr from 'toastr';
import {Row, Col} from 'antd';
import moment from 'moment';

export function formatMenuItems(tipos) {
    let formattedItems = [];
    if ( typeof tipos !== 'undefined') {
        formattedItems = tipos.map((tipo) => {
            return <MenuItem key={tipo.value} primaryText={tipo.text} value={tipo.value}/>
        });
        return formattedItems;
    }
}

class InventarioFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingresos: {
                description: '',
                referencia: '',
                monto: '',
                cantidad: '',
                tipo: '',
                date: '',
                subtipo: '',
                dateMS: ''
            },
            controlledDate: {},
            showedFormAlimentos: false,
            showedFormGranos: false
        };
    }
    componentWillMount(){
        this.props.navBarNameActions.changeName('Inventario');
    }

    openFormAlimentos = () => {
        this.setState({showedFormAlimentos: true});
    };

    closeFormAlimentos = () => {
        this.setState({showedFormAlimentos: false});
    };

    openFormGranos = () => {
        this.setState({showedFormGranos:true});
    };

    closeFormGranos = () => {
        this.setState({showedFormGranos:false});
    };

    handleChangeTipo = (event, index, value) => {
        let inventario = Object.assign({}, this.state.inventario);
        inventario.tipo = value;
        this.setState({inventario}, () => {
            switch (inventario.tipo){
                case 'animales':
                    this.openFormAlimentos();
                    break;
                case 'granos':
                    this.openFormAlimentos();
                    break;
                case 'otros':
                    this.openFormAlimentos();
                    break;
                default:
            }
        });
    };

    handleChangeSubtipo = (event, index, value) => {
        let inventario = Object.assign({}, this.state.inventario);
        inventario.subtipo = value;
        this.setState({inventario});
    };



    handleChangeDate = (name, date) => {
        const inventario = this.state.inventario;
        inventario.date = moment(date.toISOString(), moment.ISO_8601).format('DD MMMM YYYY');
        inventario.dateMS = moment(date.toISOString(), moment.ISO_8601).format('x');
        this.setState({
            inventario,
            controlledDate: date
        });
    };

    updateInventarioState = (e) => {
        const field = e.target.name;
        let inventario = Object.assign({}, this.state.inventario);
        inventario[field] = e.target.value;
        this.setState({inventario});
    };

    saveItem = (e) => {
        e.preventDefault();
        const inventarioCopy = Object.assign({},this.state.inventario);
        this.props.actions.saveInventario(inventarioCopy)
            .then( (r) => {
                toastr.success('Guardado');
                console.log(r);
                const newInventario = {
                    description: '',
                    monto: '',
                    cantidad: '',
                    tipo: '',
                    date: '',
                    referencia: '',
                    subtipo: '',
                    dateMS: ''
                };
                this.setState({inventario:newInventario});
            }).catch(e=>console.error(e));
    };


    render() {
        const { inventario, controlledDate, showedFormAlimentos} = this.state;
        const {tipos, subtiposAnimales,subtiposGranos} = this.props;
        const menuItems = formatMenuItems(tipos);
        const menuItemsSubAnimales = formatMenuItems(subtiposAnimales);
        const menuItemsSubGranos = formatMenuItems(subtiposGranos);
        const otros = [{text: 'En construccion', value: 'enconstruccion'}];
        const menuItemsSubOtros = formatMenuItems(otros);
        const menuItemsSub =
            inventario.tipo === 'animales'?
                menuItemsSubAnimales :
            inventario.tipo === 'granos' ?
                menuItemsSubGranos :
                menuItemsSubOtros
        ;
        return (



            <div style={{width:'100%'}}>


                              <FloatingActionButton
                                  style={fabstyle}
                                  onClick={this.openForm}>
                                  <ContentAdd/>
                              </FloatingActionButton>
                              <Dialog
                                  contentStyle={{width:350}}
                                  title="Agregar"
                                  actions={this.actions}
                                  modal={false}
                                  open={this.state.openForm}
                                  onRequestClose={this.closeForm}>




                <Row gutter={32}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                        <SelectField
                            name="tipo"
                            floatingLabelText="Tipo"
                            value={inventario.tipo}
                            onChange={this.handleChangeTipo}
                            fullWidth={true}
                        >
                            {menuItems}
                        </SelectField>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}/>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}/>
                </Row>
                {
                    showedFormAlimentos &&
                    <CommonFieldForm
                        inventario={inventario}
                        subtipoMenuItems={menuItemsSub}
                        controlledDate={controlledDate}
                        onChange={this.updateInventarioState}
                        onChangeTipo={this.handleChangeTipo}
                        onChangeDate={this.handleChangeDate}
                        onChangeSubtipo={this.handleChangeSubtipo}
                        onSubmit={this.saveItem}
                    />
                }

        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        inventario: state.inventario,
        tipos: state.tipos,
        subtiposAnimales: state.subtiposAnimales,
        subtiposGranos: state.subtiposGranos,
        navBarName: state.navBarName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(inventarioActions, dispatch),
        navBarNameActions: bindActionCreators(navBarNameActions, dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(InventarioFormContainer);
