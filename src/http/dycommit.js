import instance  from "./index";
const url = '/admin/dycommit';
function commitShow(id) {
    return instance.get(url+'/'+id);
}

function commitDestroy(id) {
    return instance.delete(url + '/'+id);
}

export {
    commitShow,
    commitDestroy
}