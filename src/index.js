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
import {loadTipos} from './actions/tipoActions'
import {loadGastos} from './actions/gastoActions';
import {comprobarUsuario} from "./actions/usuarioActions";

import injectTapEventPlugin from 'react-tap-event-plugin';
import 'toastr/build/toastr.min.css';
import {loadSubtiposAnimales} from "./actions/subtiposAnimalesActions";
import {loadSubtiposGranos} from "./actions/subtiposGranosActions";
import areIntlLocalesSupported from 'intl-locales-supported';

injectTapEventPlugin();

//configurar store y cargar store en redux
const store = configureStore();
//Cargar datos
store.dispatch(loadTipos());
store.dispatch(loadSubtiposAnimales());
store.dispatch(loadSubtiposGranos());
store.dispatch(loadGastos());
//comprobar si usuario esta logueado
store.dispatch(comprobarUsuario());
//imprimir state
setTimeout( () => {
    console.log(store.getState());
}, 3000);

// configurar DateTimeFormat para que el date picker
// tenga configuracion mexicana
export let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['es', 'es-MX'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
    console.info(DateTimeFormat.toString());
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/es');
    require('intl/locale-data/jsonp/es-MX');
}
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
