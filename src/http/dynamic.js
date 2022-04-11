import instance  from "./index";

const url = '/admin/dynamic';
function dynamicIndex(dataObj) {
    return instance.get('/login', {
        params: dataObj
    });
}

function dynamicDistroy(id) {
    return instance.delete(url + '/'+id);
}


export {
    dynamicIndex,
    dynamicDistroy
}