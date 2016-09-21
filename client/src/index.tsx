import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Relay from 'react-relay';
import App from './components/root/App';
import AppHomeRoute from './routes/AppHomeRoute';
import './index.scss';

ReactDOM.render(
    <Relay.RootContainer
        Component={App}
        route={new AppHomeRoute()}
    />,
    document.getElementById('root'));
