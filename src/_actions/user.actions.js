import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { loaderActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password, user_role_id) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        userService.login(username, password, user_role_id)
            .then(
                user => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(user));
                    if (user[0].Role_Type_Code_Id === 1) {
                        history.push('/university/departments');
                    } else if (user[0].Role_Type_Code_Id === 2) {
                        history.push('/Department/Courses');
                    } else if (user[0].Role_Type_Code_Id === 3) {
                        history.push('/Student/Enroll');
                    } else if (user[0].Role_Type_Code_Id === 4) {
                        history.push('/Tutor/Exam');
                    }


                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        userService.register(user)
            .then(
                user => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };


    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }

    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll(user_role_id) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        userService.getAll(user_role_id)
            .then(
                users => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(users))
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()))
                }
            );
    };


    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }

    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(id));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(id, error.toString()))
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }

    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }

    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}