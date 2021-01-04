import { listApi } from "../../services/products";

export const loadProduct = payload => async dispatch=>{
    
    const res = await listApi()
    
    dispatch({
        type:"PRODUCT_LOADED",
        payload:res
    })
}
