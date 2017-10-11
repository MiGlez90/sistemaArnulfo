import React, { Component } from 'react';
import './HomePage.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navBarNameActions from '../../actions/navBarNameActions';

class HomePage extends Component {
    componentWillMount(){
        this.props.navBarNameActions.changeName('Inicio');
    }

    render(){
        return(
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        navBarName: state.navBarName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        navBarNameActions: bindActionCreators(navBarNameActions, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (HomePage);