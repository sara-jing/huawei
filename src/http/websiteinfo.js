import instance from '../http/index';
const url = '/admin/websiteinfo';
function websiteInfoIndex() {
    return instance.get(url);
}
function websiteInfoUpdate(id,dataObj) {
    return instance.put(url+'/'+id, dataObj);
}
export {
    websiteInfoIndex,
    websiteInfoUpdate
}