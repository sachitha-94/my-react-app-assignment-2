//import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";

export const courseService = {
    addCourse,
    editCourse,
    getAllCourses,
    delete: _delete,
    addModule,
    editModule,
    getAllModules,
    deleteModule: deleteModule

};

const config = {
    apiUrl: 'http://localhost:4000'
};

function addCourse(course) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/department/add-course`, course, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('course', JSON.stringify(response.data.data));
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}


function editCourse(course) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/department/edit-course`, course, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('course', JSON.stringify(response.data.data));
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}


function getAllCourses() {

    var promise = new Promise(function(resolve, reject) {

        axios.get(`${config.apiUrl}/department/courses`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('course', JSON.stringify(response.data.data));
                        resolve(response.data.data);

                    }
                } else if (response.status === 400) {

                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}


function getDepartmentAdmins() {

    var promise = new Promise(function(resolve, reject) {

        axios.get(`${config.apiUrl}/university/get-courses-admins`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('course', JSON.stringify(response.data.data));
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}

//department/delete-course

function _delete(Course_Id) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var data = {
        Course_Id,
    }

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/department/delete-course`, data, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.data);
                    } else {
                        //localStorage.setItem('course', JSON.stringify(response.data.data));
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}


function addModule(Module) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/department/add-module`, Module, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}


function editModule(Module) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/edit-module`, Module, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}


function getAllModules() {

    var promise = new Promise(function(resolve, reject) {

        axios.get(`${config.apiUrl}/department/modules`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('Module', JSON.stringify(response.data.data));
                        resolve(response.data.data);

                    }
                } else if (response.status === 400) {

                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}


function deleteModule(id) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var data = {
        id,
    }

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/delete-module`, data, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.data);
                    } else {
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}