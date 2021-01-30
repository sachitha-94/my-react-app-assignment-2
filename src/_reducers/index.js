import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { departmentsReducer } from './university.reducer';
import { coursesReducer } from './course.reducer';
import { loaderReducer } from './loader.reducer';
import { studentReducer } from './student.reducer';
import { examReducer } from './exam.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    departmentsReducer,
    loaderReducer,
    coursesReducer,
    studentReducer,
    examReducer
});

export default rootReducer;