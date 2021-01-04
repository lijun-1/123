import { get } from "../utils/request";


export function loginApi(){
    return get('/user')
}