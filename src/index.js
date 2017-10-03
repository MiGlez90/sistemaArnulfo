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



const store = configureStore();
store.dispatch(loadIngresos());
store.dispatch(loadTipos());


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

