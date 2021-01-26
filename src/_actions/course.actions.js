import { courseConstants } from '../_constants';
import { courseService } from '../_services';
import { alertActions } from '.';
import { loaderActions } from '.';

export const courseActions = {
    addCourse,
    editCourse,
    getAllCourses,
    delete: _delete,
    addModule,
    editModule,
    getAllModules,
    deleteModule: deleteModule
};

function addCourse(course) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        courseService.addCourse(course)
            .then(
                course => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success("Successfully Added Course"));
                    dispatch(success(course));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(course) { return { type: courseConstants.ADD_COURSE_REQUEST, course } }

    function success(course) { return { type: courseConstants.ADD_COURSE_SUCCESS, course } }

    function failure(error) { return { type: courseConstants.ADD_COURSE_FAILURE, error } }
}

function editCourse(course) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        courseService.editCourse(course)
            .then(
                course => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success('Registration successful'));
                    dispatch(success());

                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(course) { return { type: courseConstants.EDIT_COURSE_REQUEST, course } }

    function success(course) { return { type: courseConstants.EDIT_COURSE_SUCCESS, course } }

    function failure(error) { return { type: courseConstants.EDIT_COURSE_FAILURE, error } }
}


function getAllCourses() {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        courseService.getAllCourses()
            .then(
                courses => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(courses));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: courseConstants.GETALL_COURSES_REQUEST } }

    function success(courses) { return { type: courseConstants.GETALL_COURSES_SUCCESS, courses } }

    function failure(error) { return { type: courseConstants.GETALL_COURSES_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(Course_Id) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        dispatch(request(Course_Id));

        courseService.delete(Course_Id)
            .then(
                course => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(Course_Id))
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(Course_Id, error.toString()))
                }
            );
    };

    function request(Course_Id) { return { type: courseConstants.DELETE_COURSE_REQUEST, Course_Id } }

    function success(Course_Id) { return { type: courseConstants.DELETE_COURSE_SUCCESS, Course_Id } }

    function failure(Course_Id, error) { return { type: courseConstants.DELETE_COURSE_FAILURE, Course_Id, error } }
}

function addModule(module) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        courseService.addModule(module)
            .then(
                module => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success("Successfully Added Module"));
                    dispatch(success(module));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(module) { return { type: courseConstants.ADD_MODULE_REQUEST, module } }

    function success(module) { return { type: courseConstants.ADD_MODULE_SUCCESS, module } }

    function failure(error) { return { type: courseConstants.ADD_MODULE_FAILURE, error } }
}

function editModule(module) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        courseService.editModule(module)
            .then(
                module => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success('Registration successful'));
                    dispatch(success());

                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(module) { return { type: courseConstants.EDIT_MODULE_REQUEST, module } }

    function success(module) { return { type: courseConstants.EDIT_MODULE_SUCCESS, module } }

    function failure(error) { return { type: courseConstants.EDIT_MODULE_FAILURE, error } }
}


function getAllModules() {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        courseService.getAllModules()
            .then(
                modules => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(modules));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                }
            );
    };


    function success(modules) { return { type: courseConstants.GETALL_MODULES_SUCCESS, modules } }

    function failure(error) { return { type: courseConstants.GETALL_MODULES_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteModule(Module_Id) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        dispatch(request(Module_Id));

        courseService.deleteModule(Module_Id)
            .then(
                module => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(Module_Id))
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(Module_Id, error.toString()))
                }
            );
    };

    function request(Module_Id) { return { type: courseConstants.DELETE_MODULE_REQUEST, Module_Id } }

    function success(Module_Id) { return { type: courseConstants.DELETE_MODULE_SUCCESS, Module_Id } }

    function failure(Module_Id, error) { return { type: courseConstants.DELETE_MODULE_FAILURE, Module_Id, error } }
}