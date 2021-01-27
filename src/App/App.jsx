import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../_styles/Styles.css'
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { Alert, Spinner } from "react-bootstrap";

const App = (props) => {

    const { alert, loader, clearAlerts } = props;
    useEffect(() => {
    history.listen((location, action) => {
        // clear alert on location change
        clearAlerts();
    });
    }, [])

    return (
        <div>

            <Router history={history}>
                {alert.message &&
                    <Alert className="alert-box" variant={alert.type == "alert-danger" ? 'danger' : 'success'} dismissible onClose={() => this.props.clearAlerts()}>
                        <Alert.Heading>{alert.type == "alert-danger" ? 'Error' : 'Success'}!  {alert.message}</Alert.Heading>
                    </Alert>
                }
                {loader.loading && loader.count != 0 &&
                    <div className="custom-loader">
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="dark" />
                    </div>
                }
                <Switch>
                    <PrivateRoute path="/university" component={HomePage} />
                    <PrivateRoute path="/Department" component={HomePage} />
                    <PrivateRoute path="/Student" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Redirect from="*" to="/login" />
                </Switch>
            </Router>
        </div>
    );
}

function mapState(state) {
    const { alert, loaderReducer } = state;
    return { alert, loader: loaderReducer };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };