import { SERVIDOR } from './Api';
import axios from 'axios';

class UserService {

    static urlLogin = SERVIDOR + '/users/login';
    static urlUser = SERVIDOR + '/users';
    static urlChangePassword = SERVIDOR + '/users/changePassword';
    static urlRecovery = SERVIDOR + '/users/recovery';

    static login = (data) => {
        let sendData = {
            username: data.username,
            password: data.password
        };
        return axios.post(this.urlLogin, sendData);
    }


    static create = (data) => {

        let sendData = {
            username: data.username,
            password: data.password,
            email: data.email,
            name: data.name,
            lastName: data.lastName,
            role: {
                id:data.role
            }
        };
        return axios.post(this.urlUser, sendData);
    }

    static update = (data,userId) => {

        let sendData = {
            username: data.username,
            ...(data.password != "" && {password: data.password}),
            password: data.password,
            email: data.email,
            name: data.name,
            lastName: data.lastName,
            role: {
                id:data.role
            }
        };

        return axios.put(this.urlUser + "/" + userId, sendData);
    }

    static delete = (userId) => {
        console.log("UServ", userId)
        return axios.delete(this.urlUser + "/" + userId);
    }


    static list = () => {
        return axios.get(this.urlUser);
    }

    static listUser = (userId) => {
        return axios.get(this.urlUser + "/" + userId);
    }

}

export default UserService;
