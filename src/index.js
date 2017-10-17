import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadIngresos} from './actions/ingresoActions'
import {loadTipos} from './actions/tipoActions'
import {loadGastos} from './actions/gastoActions';
import {comprobarUsuario} from "./actions/usuarioActions";

import injectTapEventPlugin from 'react-tap-event-plugin';
import 'toastr/build/toastr.min.css';
import {loadSubtiposAnimales} from "./actions/subtiposAnimalesActions";
import {loadSubtiposGranos} from "./actions/subtiposGranosActions";

injectTapEventPlugin();

const store = configureStore();
store.dispatch(loadTipos());
store.dispatch(loadGastos());
store.dispatch(comprobarUsuario());
store.dispatch(loadSubtiposAnimales());
store.dispatch(loadSubtiposGranos());
setTimeout( () => {
    console.log(store.getState());
}, 3000);

const Main = () => (
    <MuiThemeProvider >
        <App />
    </MuiThemeProvider>
);

const WithRouter = () => (
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);

const ReduxProvider = () => (
    <Provider store={store}>
        <WithRouter/>
    </Provider>
);



ReactDOM.render(<ReduxProvider />, document.getElementById('root'));

registerServiceWorker();
