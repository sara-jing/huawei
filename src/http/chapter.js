import instance from "../http/index";
const url = '/admin/chapter';
function chapterCreate(dataObj) {
    return instance.post(url,dataObj);
}
function chapterIndex(params) {
    return instance.get(url, {
        params
    })
}
function chapterShow(chid) {
    return instance.get(url+'/'+chid)
}

function chapterUpdate(chid,dataObj) {
    return instance.put(url+'/'+chid,dataObj);
}

function chapterDestroy(chid) {
    return instance.delete(url+'/'+chid);
}
export {
    chapterCreate,
    chapterIndex,
    chapterShow,
    chapterUpdate,
    chapterDestroy
}