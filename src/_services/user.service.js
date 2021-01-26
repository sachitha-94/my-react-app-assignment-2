//import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

const config = {
    apiUrl: 'http://localhost:4000'
};

function login(username, password, user_role_id) {
    var data = {
        username: username,
        password: password,
        user_role_id: user_role_id
    };

    var headers = {
        'Content-Type': 'application/json'
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/login`, data, {
                headers: headers
            })
            .then(response => {
                if (response.status == 200) {
                    if (response.data.message == "error") {
                        reject(response.data.data);
                    } else {
                        localStorage.setItem('user', JSON.stringify(response.data.data));
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

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll(role) {

    var user_role_id = 0;
    if (role) {
        user_role_id = role;
    }
    var headers = {
        'Content-Type': 'application/json'
    };

    var promise = new Promise(function(resolve, reject) {

        axios.get(`${config.apiUrl}/users/get-all/${user_role_id}`, {}, {
                headers: headers
            })
            .then(response => {
                if (response.status == 200) {
                    if (response.data.message == "error") {
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

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {

    var headers = {
        'Content-Type': 'application/json'
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/register`, user, {
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

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {

    //config: {url: "http://localhost:4000/login", method: "post", data: "{"username":"muqsita","password":"123","user_role_id":"3"}", headers: {…}, transformRequest: Array(1), …}
    //data: {message: "error", data: "username or password incorrect"}
    //headers: {content-length: "59", content-type: "application/json; charset=utf-8"}
    //request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
    //status: 200
    //statusText: "OK"




}