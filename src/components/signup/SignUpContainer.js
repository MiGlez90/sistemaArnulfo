import React, {Component} from 'react';
import SignUpComponent from "./SignUpComponent";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usuarioActions from '../../actions/usuarioActions';

const containerStyle = {
    height: '85vh'
};

class SignUpContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        };
    }

    handleChangeNewUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let {newUser} = this.state;
        newUser[name] = value;
        this.setState({newUser});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({},this.state.newUser);
        this.props.usuarioActions.registrarEIniciarSesion(user)
            .then( r => {
                this.props.history.push('/');
            });
    };




    render() {
        const {newUser} = this.state;
        return (
            <div className="App" style={containerStyle}>
                <SignUpComponent
                    newUser={newUser}
                    onChange={this.handleChangeNewUser}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        usuario: state.usuario
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usuarioActions: bindActionCreators(usuarioActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (SignUpContainer);