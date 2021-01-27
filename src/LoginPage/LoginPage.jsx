import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RoleTypeCodes } from '../_constants';
import { userActions } from '../_actions';

const LoginPage = (props) => {

    const { loggingIn, logout, login } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [user_role_id, setUser_role_id] = useState(undefined);

    useEffect(() => {
        logout();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'username') setUsername(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'user_role_id') setUser_role_id(value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (username && password && user_role_id) {
            login(username, password, user_role_id);
        }
    }

    return (
        <div className="row login-container">
        <div className="col-md-6 login-box">
            <h2>Login</h2>
                <form name="form" onSubmit={handleSubmit}>
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={handleChange} />
                    {submitted && !username &&
                        <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user_role_id ? ' has-error' : '')}>
                    <label htmlFor="password"></label>
                        <select className="form-control" name="user_role_id" value={user_role_id} onChange={handleChange}>
                        
                            <option value="0">
                            Select Role
                            </option>
                                

                        {
                                RoleTypeCodes.map((option, index) =>  {

                                return(
                                    
                                    <option value={option.id} key={index}>
                                        {option.value}
                                    </option>

                                    )
                            })

                        }
                    </select>
                    {submitted && !user_role_id &&
                        <div className="help-block">User role is required</div>
                    }
                </div>

                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                    {loggingIn &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
        </div>

    );
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };