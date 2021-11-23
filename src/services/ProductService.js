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
            ...(data.description != "" && {description: data.description}),
            ...(data.image != null && {url_image: data.image})
        };
        return axios.post(this.urlProduct, sendData);
    }

    static update = (data,productId) => {

        console.log("data",data)
        let sendData = {
            name: data.name,
            category: data.category,
            quantity: data.quantity,
            unit_price: data.unit_price,
            ...(data.description != "" && {description: data.description}),
            ...(data.image != null && {url_image: data.image})
        };

        console.log("sendData",sendData)
        return axios.put(this.urlProduct + "/" + productId, sendData);
    }

    static delete = (productId) => {

        return axios.delete(this.urlProduct + "/" + productId);
    }

    static list = () => {
        return axios.get(this.urlProduct);
    }

    static listProduct = (productId) => {
        return axios.get(this.urlProduct + "/" + productId);
    }

}

export default ProductService;
