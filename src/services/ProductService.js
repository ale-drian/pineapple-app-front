import { SERVIDOR } from './Api';
import axios from 'axios';

class ProductService {

    static urlProduct = SERVIDOR + '/products';

    static create = (data) => {

        let sendData = {
            name: data.name,
            category: data.category,
            quantity: data.quantity,
            unit_price: data.unit_price,
            description: data.description,
            url_image: "no_hay"
        };
        console.log("data", data)
        console.log("sendData", sendData)
        return axios.post(this.urlProduct, sendData);
    }

    static update = (data,userId) => {

        let sendData = {
            id: data.userId,
            username: data.username,
            password: data.password,
            email: data.email,
            name: data.name,
            lastname: data.lastname,
            role: data.role
        };

        return axios.put(this.urlProduct, sendData);
    }

    static delete = (userId) => {

        return axios.delete(this.urlProduct + " / " + userId);
    }

    static list = () => {
        return axios.get(this.urlProduct);
    }

    static listProduct = (userId) => {
        return axios.get(this.urlProduct + "/" + userId);
    }

}

export default ProductService;
