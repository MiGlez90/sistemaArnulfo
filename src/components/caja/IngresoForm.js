import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {MenuItem} from 'material-ui';
import DatePicker from 'material-ui/DatePicker';





class IngresoForm extends Component{

    state = {
        otro:false,
        lista:[],
        subtipo:{
            animal: [
                    ["porcino", "Porcino"],
                    ["equino", "Equino"],
                    ["bobino", "Bobino"]
                ],
            semilla:[
                ["maiz", "Maiz"],
                ["sorgo", "Sorgo"],
                ["avena", "Avena"]
            ]

        }
    };

    //handleChange = (event, index, value) => this.setState({value});

    handleTipo = (e, i, v) => {
        if(v==="otro"){
            this.setState({otro:true});
            return this.props.handleTipo(e,i,v);

        }
        this.setState({lista:this.state.subtipo[v], otro:false});
        this.props.handleTipo(e,i,v);
    };

    render(){
        const {otro} = this.state;
        const {newItem} = this.props;
        return(
            <div>
                <DatePicker
                    autoOk={true}
                    value={newItem.fecha}
                    onChange={this.props.handleDate}
                    hintText="Fecha del Ingreso" />
                <TextField
                    value={newItem.cantidad}
                    type="number"
                    name="cantidad"
                    hintText="1200"
                    floatingLabelText="Cantidad del Ingreso"
                    onChange={this.props.onChange}
                /><br />
                <SelectField
                    value={newItem.tipo}
                    name="tipo"
                    floatingLabelText="Tipo de Ingreso"
                    onChange={this.handleTipo}
                >
                    <MenuItem value={"animal"} primaryText="Animal" />
                    <MenuItem value={"semilla"} primaryText="Semilla" />
                    <MenuItem value={"otro"} primaryText="Otro" />
                </SelectField>
                <br/>
                {!otro ? <SelectField
                    value={newItem.subtipo}
                    name="subtipo"
                    floatingLabelText="Subtipo de Ingreso"
                    onChange={this.props.handleSub}
                >
                    {this.state.lista.map((t,i)=>(
                        <MenuItem key={i} value={t[0]} primaryText={t[1]} />
                    ))}


                </SelectField> :
                    <TextField
                        value={newItem.subtipo}
                        type="text"
                        name="subtipo"
                        hintText="Descripción"
                        floatingLabelText="Descripción del Ingreso"
                        onChange={this.props.onChange}
                    />
                }

                <TextField
                    value={newItem.description}
                    multiLine={true}
                    rows={2}
                    type="text"
                    name="description"
                    hintText="Descripción"
                    floatingLabelText="Descripción del Ingreso"
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default IngresoForm;