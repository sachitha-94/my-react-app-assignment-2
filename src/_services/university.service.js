//import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";

export const departmentService = {
    addDepartment,
    editDepartment,
    getAllDepartments,
    getDepartmentAdmins,
    delete: _delete
};

const config = {
    apiUrl: 'http://localhost:4000'
};

function addDepartment(department) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/university/add-department`, department, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('department', JSON.stringify(response.data.data));
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


function editDepartment(department) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/edit-department`, department, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('department', JSON.stringify(response.data.data));
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


function getAllDepartments() {

    var promise = new Promise(function(resolve, reject) {

        axios.get(`${config.apiUrl}/university/departments`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('department', JSON.stringify(response.data.data));
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

        axios.get(`${config.apiUrl}/university/get-departments-admins`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('department', JSON.stringify(response.data.data));
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

//university/get-departments-admins

function _delete(id) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var data = {
        id,
    }

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/delete-department`, data, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.data);
                    } else {
                        //localStorage.setItem('department', JSON.stringify(response.data.data));
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