import axios from "axios";
import { getToken } from "./auth";
const instance = axios.create({
    baseURL: 'http://localhost:3004',
    timeout: 5000
})

instance.interceptors.request.use(
    function(config){
        config.headers["authorization"] = "Bearer" + getToken();
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

instance.interceptors.response.use({
    function(response){
        return response.data;
    },
    function(error){
        return Promise.reject(error);
    }
})

export function get(url){
    return instance.get(url)
}

export function post(url,data){
    return instance.post(url,data)
}

export function put(url,data){
    return instance.put(url,data)
}

export function del(url){
    return instance.delete(url)
}