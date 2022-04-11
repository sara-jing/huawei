import instance from "../http/index";
const url = '/admin/news'

function newsCreate(data) {
    return instance.post(url,data);
}

function newsIndex() {
    return instance.get(url);
}

function  newsShow(nid) {
    return instance.get(url+'/'+nid);
}

function newsUpdate(nid,data) {
    return instance.put(url+'/'+nid,data);
}

function newsDestroy(nid) {
    return instance.delete(url+'/'+nid);
}
export {
    newsCreate,
    newsIndex,
    newsShow,
    newsUpdate,
    newsDestroy

}