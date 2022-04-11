import instance from "../http/index";
const url = '/admin/course';

function courseIndex(params) {
    return instance.get(url, {
        params
    });
}

function courseCreate(data) {
    return instance.post(url, data);
}

function courseShow(id) {
    return instance.get(url+'/'+id);
}

function courseUpdate(id,dataObj) {
    return instance.put(url+'/'+id,dataObj);
}

function courseDestroy(id) {
    return instance.delete(url+'/'+id);
}

export {
    courseCreate,
    courseIndex,
    courseShow,
    courseUpdate,
    courseDestroy
}
