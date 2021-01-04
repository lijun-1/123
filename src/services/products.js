import { del, get, post, put } from "../utils/request";

export function listApi(){
    return get('/dataSource');
}
export function creatApi(data){
    return post('/dataSource',data);
}
export function modifyOne(id,data){
    return put(`/dataSource/${id}`,data);
}
export function delOne(id){
    return del(`/dataSource/${id}`);
}
export function getOneById(id){
    return get(`/dataSource/${id}`);
}