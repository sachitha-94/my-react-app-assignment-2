import { courseConstants } from '../_constants';

export function coursesReducer(state = { courses: [], course: {}, modules: [], module: {} }, action) {
    switch (action.type) {
        case courseConstants.GETALL_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.courses
            };
        case courseConstants.GETALL_COURSES_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case courseConstants.EDIT_COURSE_REQUEST:
            return {
                ...state,
            };
        case courseConstants.EDIT_COURSE_SUCCESS:
            return {
                ...state,
                course: action.course
            };
        case courseConstants.EDIT_COURSE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case courseConstants.ADD_COURSE_REQUEST:
            return {
                ...state,
            };
        case courseConstants.ADD_COURSE_SUCCESS:
            return {
                ...state,
                course: action.course
            };
        case courseConstants.ADD_COURSE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case courseConstants.DELETE_COURSE_REQUEST:
            // add 'deleting:true' property to course being deleted
            return {
                ...state,
                courses: state.courses.map(course =>
                    course.Course_Id === action.Course_Id ? {...course, deleting: true } :
                    course
                )
            };
        case courseConstants.DELETE_COURSE_SUCCESS:
            // remove deleted course from state
            return {
                courses: state.courses.filter(course => course.Course_Id !== action.Course_Id)
            };
        case courseConstants.DELETE_COURSE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to course 
            return {
                ...state,
                courses: state.courses.map(course => {
                    if (course.Course_Id === action.Course_Id) {
                        // make copy of course without 'deleting:true' property
                        const { deleting, ...courseCopy } = course;
                        // return copy of course with 'deleteError:[error]' property
                        return {...courseCopy, deleteError: action.error };
                    }

                    return course;
                })
            };
        case courseConstants.GETALL_MODULES_SUCCESS:
            return {
                ...state,
                modules: action.modules
            };
        case courseConstants.GETALL_MODULES_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case courseConstants.EDIT_MODULE_REQUEST:
            return {
                ...state,
            };
        case courseConstants.EDIT_MODULE_SUCCESS:
            return {
                ...state,
                module: action.module
            };
        case courseConstants.EDIT_MODULE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case courseConstants.ADD_MODULE_REQUEST:
            return {
                ...state,
            };
        case courseConstants.ADD_MODULE_SUCCESS:
            return {
                ...state,
                module: action.module
            };
        case courseConstants.ADD_MODULE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case courseConstants.DELETE_MODULE_REQUEST:
            // add 'deleting:true' property to module being deleted
            return {
                ...state,
                modules: state.modules.map(module =>
                    module.Module_Id === action.Module_Id ? {...module, deleting: true } :
                    module
                )
            };
        case courseConstants.DELETE_MODULE_SUCCESS:
            // remove deleted module from state
            return {
                modules: state.modules.filter(module => module.Module_Id !== action.Module_Id)
            };
        case courseConstants.DELETE_MODULE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to module 
            return {
                ...state,
                modules: state.modules.map(module => {
                    if (module.Module_Id === action.Module_Id) {
                        // make copy of module without 'deleting:true' property
                        const { deleting, ...moduleCopy } = module;
                        // return copy of module with 'deleteError:[error]' property
                        return {...moduleCopy, deleteError: action.error };
                    }

                    return module;
                })
            };
        default:
            return state
    }
}