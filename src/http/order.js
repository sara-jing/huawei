import instance  from '../http/index';
const url = '/admin/order';

function orderIndex() {
    return instance.get(url);
}


function orderDestroy(oid) {
    return instance.delete(url+'/'+oid);
}
export {
   
    orderIndex,
   
    orderDestroy
}