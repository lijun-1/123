export default (state={list:[],total:0},action)=>{
    switch(action.type){
       case 'PRODUCT_LOADED':           
            return {...state,list:action.payload.data,total:action.payload.data.length}; 
        default:
            return state;
    }
};