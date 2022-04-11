import instance  from "./index";
const url = '/admin/quscommit';
function commitShow(qid) {
    return instance.get(url+'/'+qid);
}

function commitDestroy(qid) {
    return instance.delete(url + '/'+qid);
}

export {
    commitShow,
    commitDestroy
}